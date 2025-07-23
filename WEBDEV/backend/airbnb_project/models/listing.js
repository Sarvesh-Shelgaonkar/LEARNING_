// ===============================
// Listing Model (Mongoose Schema)
// ===============================
// This file defines the schema for a Listing in the Airbnb project.
// It is used by Mongoose to interact with the 'listings' collection in MongoDB.
//
// FLOW (numbered):
// 1. Server imports this model in app.js: const Listing = require('./models/listing')
// 2. Server uses Listing.find() to get all listings
// 3. Server uses Listing.findById() to get a single listing
// 4. Server uses Listing.create() or new Listing() + save() to add a listing
// 5. Server uses Listing.findByIdAndUpdate() to update a listing
// 6. Server uses Listing.findByIdAndDelete() to delete a listing
//
// The schema defines the structure of each listing document.

const mongoose = require('mongoose'); // Import mongoose ODM

// Define the schema for a Listing
const listingSchema = new mongoose.Schema({
  // Title of the listing (e.g., "Cozy Cottage")
  title: {
    type: String,
    required: true, // This field is required
  },
  // Description of the listing
  description: {
    type: String,
    required: true,
  },
  // Price per night (number)
  price: {
    type: Number,
    required: true,
  },
  // Location is an embedded object with country, city, street, zipCode
  location: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    }
  },
  // Images is an array of strings (URLs)
  images: [{
    type: String, // Each image is a URL string
    // Example: "https://example.com/image.jpg"
  }]
});

// Export the model
// This creates a Mongoose model called 'Listing' based on the schema above.
// The model provides methods to interact with the 'listings' collection in MongoDB.
module.exports = mongoose.model('Listing', listingSchema);
