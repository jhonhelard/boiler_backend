// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");

const connectDB = require("./db/connection");

// Initialize Express app
const app = express();

// Create an HTTP server with Express
const server = http.createServer(app);


// Middleware options for CORS
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true); // Allow requests from all origins
  },
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};


// Connect to MongoDB using the connection function
connectDB();

// Configure middleware
app.use(cors(corsOptions)); // Enable CORS with options
app.use(bodyParser.json()); // Parse JSON bodies with standard JSON format
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies


// Import route modules
const authRouter = require("./routes/auth");
const cityRouter = require("./routes/city");

// Register routes with base paths
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/city", cityRouter);
// app.use("/api/v1/users", userRouter);

let googleSheetData = [];
let googleSheetData1 = [];
let totalstate = [];
let perType = [];
let perFuelUsed = [];
let variousIndustries = [];
let HeatingSurface=[];
let perCapacity=[];
let certificate=[];
let BoilerRegistered=[];
let Accidents=[];
let Economisers=[];
let perVarious=[];
let perVarious1=[];
let perVarious2=[];
let perVarious3=[];
let perVarious4=[];
let perVarious5=[];
let perVarious6=[];
let perVarious7=[];

let EconomiserStatus=[];
let RunningEconomisers=[];
let Accident=[];
let Accident1=[];
let Accident2=[];
let Accident3=[];
let Accident4=[];
let Accident5=[];
let Accident6=[];
let Accident7=[];


async function fetchGoogleSheetData() {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  // Check if environment variables are set
  if (!SHEET_ID || !API_KEY) {
    console.error('Missing required environment variables: GOOGLE_SHEET_ID or GOOGLE_API_KEY');
    return;
  }
  
  const RANGE = 'Sheet1!A1:Z13000'; // adjust range as needed
  const RANGE1 = 'Master sheet (2)!A1:ZZ11'; // adjust range as needed - extended to get up to 702 columns
  const totalstateRANGE= 'Master sheet (2)!B3:F11'; // adjust range as needed - extended to get up to 702 columns
  const perTypeRANGE = 'Master sheet (2)!B85:R93'; // adjust range as needed - extended to get up to 702 columns
  const perFuelUsedRANGE = 'Master sheet (2)!B71:X79'; // adjust range as needed - extended to get up to 702 columns
  const variousIndustriesRANGE = 'Master sheet (2)!B109:AC117'; // adjust range as needed - extended to get up to 702 columns
  const HeatingSurfaceRANGE = 'Master sheet (2)!B121:J129';
  const perCapacityRANGE = 'Master sheet (2)!B98:K106';
  const certificateRANGE = 'Master sheet (2)!B133:I141';
  const BoilerRegisteredRANGE = 'Master sheet (2)!B152:G153';
  const AccidentsRANGE = 'Master sheet (2)!B145:G148';
  const EconomisersRANGE = 'Master sheet (2)!B157:G159';
  const perVariousRANGE = 'Master sheet (2)!B195:O197';
  const perVariousRANGE1 = 'Master sheet (2)!B196:H198';
  const perVariousRANGE2 = 'Master sheet (2)!J196:M198';
  const perVariousRANGE3 = 'Master sheet (2)!B201:H203';
  const perVariousRANGE4 = 'Master sheet (2)!J201:O203';
  const perVariousRANGE5 = 'Master sheet (2)!B206:H208';
  const perVariousRANGE6 = 'Master sheet (2)!J206:O208';
  const perVariousRANGE7 = 'Master sheet (2)!B211:M213';
  const EconomiserStatusRANGE = 'Master sheet (2)!B162:F170';
  const RunningEconomisersRANGE = 'Master sheet (2)!B174:AC182';
  const Accident1RANGE = 'Master sheet (2)!B216:G219';
  const Accident2RANGE = 'Master sheet (2)!B222:G225';
  const Accident3RANGE = 'Master sheet (2)!B228:G231';
  const Accident4RANGE = 'Master sheet (2)!B234:G237';
  const Accident5RANGE = 'Master sheet (2)!B240:G243';
  const Accident6RANGE = 'Master sheet (2)!B246:G249';
  const Accident7RANGE = 'Master sheet (2)!B252:G255';

   // adjust range as needed - extended to get up to 702 columns

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  const url1 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE1}?key=${API_KEY}`;
  const url2 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${totalstateRANGE}?key=${API_KEY}`;
  const url3 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perTypeRANGE}?key=${API_KEY}`;
  const url4 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perFuelUsedRANGE}?key=${API_KEY}`;
  const url5 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${variousIndustriesRANGE}?key=${API_KEY}`;
  const url6 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${HeatingSurfaceRANGE}?key=${API_KEY}`;
  const url7 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perCapacityRANGE}?key=${API_KEY}`;
  const url8 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${certificateRANGE}?key=${API_KEY}`;
  const url9 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${BoilerRegisteredRANGE}?key=${API_KEY}`;
  const url10 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${AccidentsRANGE}?key=${API_KEY}`;
  const url11 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${EconomisersRANGE}?key=${API_KEY}`;
  const url12 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE}?key=${API_KEY}`;
  const url15 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE1}?key=${API_KEY}`;
  const url16 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE2}?key=${API_KEY}`;
  const url17 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE3}?key=${API_KEY}`;
  const url18 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE4}?key=${API_KEY}`;
  const url19 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE5}?key=${API_KEY}`;
  const url20 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE6}?key=${API_KEY}`;
  const url21 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${perVariousRANGE7}?key=${API_KEY}`;
  const url13 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${EconomiserStatusRANGE}?key=${API_KEY}`;
  const url14 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RunningEconomisersRANGE}?key=${API_KEY}`;
  const url22 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident1RANGE}?key=${API_KEY}`;
  const url23 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident2RANGE}?key=${API_KEY}`;
  const url24 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident3RANGE}?key=${API_KEY}`;
  const url25 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident4RANGE}?key=${API_KEY}`;
  const url26 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident5RANGE}?key=${API_KEY}`;
  const url27 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident6RANGE}?key=${API_KEY}`;
  const url28 = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${Accident7RANGE}?key=${API_KEY}`;

  try {
    // Fetch both sheets in parallel
    const [response, response1,response2,response3,response4,response5,response6,response7,response8,response9,response10,response11,response12,response13,response14,response15,response16,response17,response18,response19,response20,response21,response22,response23,response24,response25,response26,response27,response28] = await Promise.all([
      fetch(url),
      fetch(url1),
      fetch(url2),
      fetch(url3),
      fetch(url4),
      fetch(url5),
      fetch(url6),
      fetch(url7),
      fetch(url8),
      fetch(url9),
      fetch(url10),
      fetch(url11),
      fetch(url12),
      fetch(url13),
      fetch(url14),
      fetch(url15),
      fetch(url16),
      fetch(url17),
      fetch(url18),
      fetch(url19),
      fetch(url20),
      fetch(url21),
      fetch(url22),
      fetch(url23),
      fetch(url24),
      fetch(url25),
      fetch(url26),
      fetch(url27),
      fetch(url28),
    ]);

    const [data, data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22,data23,data24,data25,data26,data27,data28] = await Promise.all([
      response.json(),
      response1.json(),
      response2.json(),
      response3.json(),
      response4.json(),
      response5.json(),
      response6.json(),
      response7.json(),
      response8.json(),
      response9.json(),
      response10.json(),
      response11.json(),
      response12.json(),
      response13.json(),
      response14.json(),
      response15.json(),
      response16.json(),
      response17.json(),
      response18.json(),
      response19.json(),
      response20.json(),
      response21.json(),
      response22.json(),
      response23.json(),
      response24.json(),
      response25.json(),
      response26.json(),
      response27.json(),
      response28.json(),
    ]);

    const rows = data.values;
    const rows1 = data1.values;
    const rows2 = data2.values;
    const rows3 = data3.values;
    const rows4 = data4.values;
    const rows5 = data5.values;
    const rows6 = data6.values;
    const rows7 = data7.values;
    const rows8 = data8.values;
    const rows9 = data9.values;
    const rows10 = data10.values;
    const rows11 = data11.values;
    const rows12 = data12.values;
    const rows13 = data13.values;
    const rows14 = data14.values;
    const rows15 = data15.values;
    const rows16 = data16.values;
    const rows17 = data17.values;
    const rows18 = data18.values;
    const rows19 = data19.values;
    const rows20 = data20.values;
    const rows21 = data21.values;
    const rows22 = data22.values;
    const rows23 = data23.values;
    const rows24 = data24.values;
    const rows25 = data25.values;
    const rows26 = data26.values;
    const rows27 = data27.values;
    const rows28 = data28.values;

    if (!rows || rows.length === 0) {
      console.error('Error: No data found in Sheet1');
      return;
    }

    if (!rows1 || rows1.length === 0) {
      console.error('Error: No data found in Master sheet (2)');
      return;
    }

    if (!rows2 || rows2.length === 0) {
      console.error('Error: No data found in Master totalstate');
      return;
    }
    if (!rows3 || rows3.length === 0) {
      console.error('Error: No data found in Master perType');
      return;
    }
    if (!rows4 || rows4.length === 0) {
      console.error('Error: No data found in Master perFuelUsed');
      return;
    }
    if (!rows5 || rows5.length === 0) {
      console.error('Error: No data found in Master variousIndustries');
      return;
    }
    if (!rows6 || rows6.length === 0) {
      console.error('Error: No data found in Master HeatingSurface');
      return;
    }
    if (!rows7 || rows7.length === 0) {
      console.error('Error: No data found in Master perCapacity');
      return;
    }
    if (!rows8 || rows8.length === 0) {
      console.error('Error: No data found in Master certificate');
      return;
    }
    if (!rows9 || rows9.length === 0) {
      console.error('Error: No data found in Master BoilerRegistered');
      return;
    }
    if (!rows10 || rows10.length === 0) {
      console.error('Error: No data found in Master Accidents');
      return;
    }
    if (!rows11 || rows11.length === 0) {
      console.error('Error: No data found in Master Economisers');
      return;
    }
    if (!rows12 || rows12.length === 0) {
      console.error('Error: No data found in Master perVarious');
      return;
    }
    if (!rows13 || rows13.length === 0) {
      console.error('Error: No data found in Master EconomiserStatus');
      return;
    }
    if (!rows14 || rows14.length === 0) {
      console.error('Error: No data found in Master RunningEconomisers');
      return;
    }
    if (!rows15 || rows15.length === 0) {
      console.error('Error: No data found in Master perVarious1');
      return;
    }
    if (!rows16 || rows16.length === 0) {
      console.error('Error: No data found in Master perVarious2');
      return;
    }
    if (!rows17 || rows17.length === 0) {
      console.error('Error: No data found in Master perVarious3');
      return;
    }
    if (!rows18 || rows18.length === 0) {
      console.error('Error: No data found in Master perVarious4');
      return;
    }
    if (!rows19 || rows19.length === 0) {
      console.error('Error: No data found in Master perVarious5');
      return;
    }
    if (!rows20 || rows20.length === 0) {
      console.error('Error: No data found in Master perVarious6');
      return;
    }
    if (!rows21 || rows21.length === 0) {
      console.error('Error: No data found in Master perVarious7');
      return;
    }
    if (!rows22 || rows22.length === 0) {
      console.error('Error: No data found in Master Accident1');
      return;
    }
    if (!rows23 || rows23.length === 0) {
      console.error('Error: No data found in Master Accident2');
      return;
    } 
    if (!rows24 || rows24.length === 0) {
      console.error('Error: No data found in Master Accident3');
      return;
    }
    if (!rows25 || rows25.length === 0) {
      console.error('Error: No data found in Master Accident4');
      return;
    } 
    if (!rows26 || rows26.length === 0) {
      console.error('Error: No data found in Master Accident5');
      return;
    }
    if (!rows27 || rows27.length === 0) {
      console.error('Error: No data found in Master Accident6');
      return;
    }
    if (!rows28 || rows28.length === 0) {
      console.error('Error: No data found in Master Accident7');
      return;
    }

    googleSheetData = rows;
    googleSheetData1 = rows1;
    totalstate = rows2;
    perType = rows3;
    perFuelUsed = rows4;
    variousIndustries = rows5;
    HeatingSurface = rows6;
    perCapacity = rows7;
    certificate = rows8;
    BoilerRegistered = rows9;
    Accidents = rows10;
    Economisers = rows11;
    EconomiserStatus = rows13;
    RunningEconomisers = rows14;
    perVarious1 = rows15;
    perVarious2 = rows16;
    perVarious3 = rows17;
    perVarious4 = rows18;
    perVarious5 = rows19;
    perVarious6 = rows20;
    perVarious7 = rows21;
    Accident1 = rows22;
    Accident2 = rows23;
    Accident3 = rows24;
    Accident4 = rows25;
    Accident5 = rows26;
    Accident6 = rows27;
    Accident7 = rows28;
    perVarious = [{title:"MUMBAI",data:perVarious1},{title:"PUNE",data:perVarious2},{title:"AHILYANAGAR",data:perVarious3},{title:"NASHIK",data:perVarious4},{title:"SOLAPUR",data:perVarious5},{title:"KOLHAPUR",data:perVarious6},{title:"NAGPUR",data:perVarious7}]
    Accident = [{title:"MUMBAI",data:Accident1},{title:"PUNE",data:Accident2},{title:"AHILYANAGAR",data:Accident3},{title:"NASHIK",data:Accident4},{title:"SOLAPUR",data:Accident5},{title:"KOLHAPUR",data:Accident6},{title:"NAGPUR",data:Accident7}]
    

    console.log(`Successfully fetched ${rows.length} rows from Sheet1 and ${rows1.length} rows from Master sheet2 and ${rows2.length} rows from Master totalstate`);
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
}

// Fetch data once when the server starts
fetchGoogleSheetData();



app.get('/api/sheet-data', (req, res) => {    
  res.json([googleSheetData]);
});

app.get('/api/sheet-data1', (req, res) => {    
  console.log(totalstate,"total");
  
  res.json([googleSheetData1,totalstate,perType,perFuelUsed,variousIndustries,HeatingSurface,perCapacity,certificate,BoilerRegistered,Accidents,Economisers,perVarious,EconomiserStatus,RunningEconomisers,Accident]);
});

// Endpoint to refresh Google Sheets data
app.post('/api/refresh-sheet-data', async (req, res) => {
  try {
    console.log('Refreshing Google Sheets data...');
    await fetchGoogleSheetData();
    console.log('Google Sheets data refreshed successfully');
    res.json({ 
      success: true, 
      message: 'Data refreshed successfully',
      data: [googleSheetData,googleSheetData1,totalstate,perType,perFuelUsed,variousIndustries,HeatingSurface,perCapacity,certificate,BoilerRegistered,Accidents,Economisers,perVarious,EconomiserStatus,RunningEconomisers,Accident]
    });
  } catch (error) {
    console.error('Error refreshing data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to refresh data' 
    });
  }
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3013;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

