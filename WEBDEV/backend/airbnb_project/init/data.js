// ===============================
// Sample Data for Database Initialization
// ===============================
// This file exports an array of sample listings to populate the database.
//
// FLOW (numbered):
// 1. This file exports sample listings as an array
// 2. Used by init/index.js to seed the database
// 3. Each object in the array represents a property listing

const sampleListings = [
  {
    // Title of the listing
    title: "Cozy Cottage",
    // Description of the listing
    description: "A charming cottage in the countryside.",
    // Price per night
    price: 120,
    // Location object with country, city, street, zipCode
    location: {
      country: "USA",
      city: "Nashville",
      street: "123 Maple St",
      zipCode: "37201"
    },
    // Array of image URLs
    images: [
      "https://example.com/images/cottage1.jpg",
      "https://example.com/images/cottage2.jpg"
    ]
  },
  {
    title: "Modern Apartment",
    description: "A sleek apartment in the city center.",
    price: 250,
    location: {
      country: "USA",
      city: "New York",
      street: "456 Elm St",
      zipCode: "10001"
    },
    images: [
      "https://example.com/images/apartment1.jpg",
      "https://example.com/images/apartment2.jpg"
    ]
  }
];

// 1. Export the sample data array
// 2. This is imported by the initialization script to seed the database
module.exports = sampleListings;