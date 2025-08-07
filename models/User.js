const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true},
  hashedPassword: { type: String, required: true },
  region: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true }],
  is_owner: {type: Boolean, default:false},
  admin: {type: Boolean, default:false}
});

module.exports = mongoose.model('User', UserSchema); 