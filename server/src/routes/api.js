const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const bookingController = require('../controllers/bookingController');
const newsletterController = require('../controllers/newsletterController');
const { validateSearch, validateBooking, validateNewsletter } = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/search', validateSearch, searchController.searchFlights);
router.post('/booking', validateBooking, searchController.createBooking);
router.post('/newsletter/subscribe', validateNewsletter, newsletterController.subscribe);

// Protected routes (require authentication)
router.get('/bookings', authMiddleware, bookingController.getAllBookings);
router.get('/bookings/:id', authMiddleware, bookingController.getBookingById);
router.put('/bookings/:id/status', authMiddleware, bookingController.updateBookingStatus);
router.delete('/bookings/:id/cancel', authMiddleware, bookingController.cancelBooking);

module.exports = router;