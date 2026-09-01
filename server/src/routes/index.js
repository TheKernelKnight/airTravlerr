const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const newsletterController = require('../controllers/newsletterController');

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Search routes
router.post('/search', searchController.searchFlights);
router.post('/booking', searchController.createBooking);
router.get('/bookings', searchController.getAllBookings); // Add this line

// Newsletter
router.post('/newsletter/subscribe', newsletterController.subscribe);

module.exports = router;