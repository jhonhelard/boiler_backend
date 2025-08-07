// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

const ownerRegister = async (req, res) => {
  try {
    const { email, password, first_name, last_name, region, admin } = req.body.data.attributes;
    
    let regionArr = region;
    if (typeof region === "string") {
      regionArr = [region];
    }
    if (!Array.isArray(regionArr) || regionArr.length === 0) {
      return res.status(400).json({ success: false, message: 'Region must be a non-empty array of region IDs.' });
    }
    for (const regionId of regionArr) {
      if (!regionId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: `Invalid region ID: ${regionId}` });
      }
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'your email already registered' 
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user with unauthorized status
    const newUser = new User({
      email,
      hashedPassword,
      first_name,
      last_name,
      region: regionArr, // always an array
      admin
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: savedUser._id,
        email: savedUser.email,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        region: savedUser.region,
        admin: savedUser.admin
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body.data.attributes;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign(
      { 
        id: user._id, 
        first_name: user.first_name,
        region: user.region,
        admin: user.admin 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const toggleUserPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.admin = !user.admin;
    await user.save();
    res.json({ success: true, admin: user.admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    // For JWT tokens, logout is handled client-side by removing the token
    // This endpoint can be used for logging purposes or future enhancements
    res.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUserRegions = async (req, res) => {
  try {
    const { id } = req.params;
    const { regions } = req.body;
    
    if (!Array.isArray(regions)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Regions must be an array' 
      });
    }
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Validate that all region IDs are valid ObjectIds
    for (const regionId of regions) {
      if (!regionId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ 
          success: false, 
          message: `Invalid region ID: ${regionId}` 
        });
      }
    }
    
    user.region = regions;
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'User regions updated successfully',
      data: {
        id: user._id,
        email: user.email,
        region: user.region
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // This endpoint is for testing - in production you'd get user ID from JWT
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('=== BACKEND USER DATA ===');
    console.log('User from database:', {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      region: user.region,
      admin: user.admin,
      is_owner: user.is_owner
    });
    
    res.json({
      success: true,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        region: user.region,
        admin: user.admin,
        is_owner: user.is_owner
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  ownerRegister,
  ownerLogin,
  getallusers,
  toggleUserPermission,
  deleteUser,
  logout,
  getCurrentUser,
  updateUserRegions
};
