// ===============================
// Airbnb Project - Phase 1 Backend
// ===============================
// This file is the main entry point for the backend server.
// It sets up the Express app, connects to MongoDB, defines routes, and starts the server.
//
// PHASE 1: Only basic CRUD operations and routing. No authentication, no advanced logic.
//
// DETAILED, NUMBERED FLOW COMMENTS are provided to explain:
// - The flow of execution when an API call is made
// - How routing works
// - How control moves between files (router, model)
// - How MongoDB queries are called

// ===============================
// 1. Import Required Modules
// ===============================
const mongoose = require('mongoose'); // ODM for MongoDB
const express = require('express'); // Web framework
const app = express(); // Create Express app instance
const Listing = require('./models/listing'); // Import Listing model (Mongoose schema)
const path = require('path'); // Node.js path module

// ===============================
// 2. Middleware Setup
// ===============================
// Express does NOT parse form data or JSON by default in Express 5+.
// We need to add middleware to parse incoming request bodies.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data (from HTML forms)
app.use(express.json()); // Parse JSON bodies (for API clients)

// ===============================
// 3. Connect to MongoDB
// ===============================
// This connects to a local MongoDB instance (airbnb database)
mongoose.connect('mongodb://localhost:27017/airbnb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
    console.log('Connected to MongoDB');
    }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    });

// ===============================
// 4. Set up EJS as the View Engine
// ===============================
// EJS allows us to render dynamic HTML pages from templates in the 'views' folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===============================
// 5. ROUTES (with step-by-step numbered comments)
// ===============================

// -----------------------------------------------
// [PAGE] GET / - Home page (simple welcome message)
// -----------------------------------------------
// 1. User comes to this page by:
//    a. Typing '/' in the browser
//    b. Or being redirected here after server start (optional)
app.get('/', (req, res) => {
  // 2. Server sends a welcome message as the response
  res.send('Welcome to the Airbnb Project!');
});

// -----------------------------------------------
// [PAGE] GET /listings - Render all listings (HTML)
// -----------------------------------------------
// 1. User comes to this page by:
//    a. Typing '/listings' in the browser
//    b. Being redirected here after creating, editing, or deleting a listing
app.get('/listings', async (req, res) => {
  // 2. Server gets all listings from DB and renders the listings page (index.ejs)
  try {
    const listings = await Listing.find();
    res.render('listings/index', { listings });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// -----------------------------------------------
// [API] GET /api/listings - Get all listings (JSON)
// -----------------------------------------------
// 1. User (or API client) comes to this endpoint by:
//    a. Typing '/api/listings' in the browser
//    b. Using an API tool (like Postman) to send a GET request
app.get('/api/listings', async (req, res) => {
  // 2. Server fetches all listings from the database and sends JSON
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// -----------------------------------------------
// [PAGE] GET /listings/new - Render form to create new listing
// -----------------------------------------------
// 1. User comes to this page by:
//    a. Clicking the 'Create New Listing' button on the listings page (/listings)
//    b. Or by typing '/listings/new' directly in the browser
app.get('/listings/new', (req, res) => {
  // 2. Server renders the new listing form (new.ejs)
  res.render('listings/new');
});

// -----------------------------------------------
// [ACTION] POST /listings - Create a new listing
// -----------------------------------------------
// 1. User comes to this endpoint by:
//    a. Submitting the new listing form on /listings/new
app.post('/listings', async (req, res) => {
  // 2. Server creates a new listing in the database and redirects to /listings
  try {
    let { title, description, price, location, images } = req.body;
    if (typeof location === 'string') {
      location = {
        country: '',
        city: location,
        street: '',
        zipCode: ''
      };
    }
    if (typeof images === 'string') {
      images = images.split(',').map(url => url.trim());
    }
    const listing = new Listing({ title, description, price, location, images });
    await listing.save();
    res.redirect('/listings');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// -----------------------------------------------
// [PAGE] GET /listings/:id - Show details for a specific listing
// -----------------------------------------------
// 1. User comes to this page by:
//    a. Clicking 'View Details' on a listing from the listings page (index.ejs)
//    b. Or by typing '/listings/:id' directly in the browser
app.get('/listings/:id', async (req, res) => {
  // 2. Server fetches the listing by ID and renders the details page (show.ejs)
  const listingId = req.params.id;
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/show', { listing });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// -----------------------------------------------
// [PAGE] GET /listings/:id/edit - Render edit form for a listing
// -----------------------------------------------
// 1. User comes to this page by:
//    a. Clicking 'Edit Listing' on the details page (/listings/:id)
//    b. Or by typing '/listings/:id/edit' directly in the browser
app.get('/listings/:id/edit', async (req, res) => {
  // 2. Server fetches the listing by ID and renders the edit form (edit.ejs)
  const listingId = req.params.id;
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/edit', { listing });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// -----------------------------------------------
// [ACTION] POST /listings/:id - Update a listing
// -----------------------------------------------
// 1. User comes to this endpoint by:
//    a. Submitting the edit listing form on /listings/:id/edit
app.post('/listings/:id', async (req, res) => {
  // 2. Server updates the listing in the database and redirects to /listings/:id
  const listingId = req.params.id;
  try {
    let { title, description, price, location, images } = req.body;
    if (typeof location === 'string') {
      location = {
        country: '',
        city: location,
        street: '',
        zipCode: ''
      };
    }
    if (typeof images === 'string') {
      images = images.split(',').map(url => url.trim());
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      { title, description, price, location, images },
      { new: true }
    );
    if (!updatedListing) {
      return res.status(404).send('Listing not found');
    }
    res.redirect(`/listings/${listingId}`);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// -----------------------------------------------
// [ACTION] POST /listings/:id/delete - Delete a listing
// -----------------------------------------------
// 1. User comes to this endpoint by:
//    a. Clicking the 'Delete Listing' button on the details page (/listings/:id)
app.post('/listings/:id/delete', async (req, res) => {
  // 2. Server deletes the listing from the database and redirects to /listings
  const listingId = req.params.id;
  try {
    const deletedListing = await Listing.findByIdAndDelete(listingId);
    if (!deletedListing) {
      return res.status(404).send('Listing not found');
    }
    res.redirect('/listings');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// ===============================
// 6. Start the Server
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

