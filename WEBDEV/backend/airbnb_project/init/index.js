// ===============================
// Database Initialization Script
// ===============================
// This script connects to MongoDB and populates the database with sample data.
//
// FLOW (numbered):
// 1. Developer runs this script (node init/index.js)
// 2. Script connects to MongoDB
// 3. Script loads sample data from init/data.js
// 4. Script inserts sample data into the database
// 5. Script disconnects from MongoDB

const mongoose = require('mongoose'); // Import mongoose
const data = require('./data'); // Import sample data array
const Listing = require('../models/listing'); // Import Listing model

// 2. Script connects to MongoDB (local instance, 'airbnb' database)
mongoose.connect('mongodb://localhost:27017/airbnb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // 3. Connection successful
  console.log('Connected to MongoDB');
  // 4. Insert sample data into the listings collection
  Listing.insertMany(data)
    .then(() => {
      // 5. Data inserted successfully
      console.log('Sample data inserted');
      // 6. Disconnect from MongoDB after insertion
      mongoose.disconnect();
    })
    .catch((error) => {
      // 7. Error inserting data
      console.error('Error inserting sample data:', error);
      // 8. Disconnect even if there is an error
      mongoose.disconnect();
    });
}).catch((error) => {
  // 9. Error connecting to MongoDB
  console.error('Error connecting to MongoDB:', error);
});