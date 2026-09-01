const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const User = require('../models/User');

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate, cabinClass } = req.body;

    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        message: 'Origin, destination, and departure date are required'
      });
    }

    // Mock flight results
    const mockResults = [
      {
        id: 'flight-1',
        airline: 'Emirates',
        flightNumber: 'EK201',
        origin,
        destination,
        departureDate,
        price: 1499,
        originalPrice: 4200,
        savings: 64,
        cabinClass: cabinClass || 'business'
      },
      {
        id: 'flight-2',
        airline: 'Singapore Airlines',
        flightNumber: 'SQ12',
        origin,
        destination,
        departureDate,
        price: 1899,
        originalPrice: 4800,
        savings: 60,
        cabinClass: cabinClass || 'business'
      },
      {
        id: 'flight-3',
        airline: 'Qatar Airways',
        flightNumber: 'QR701',
        origin,
        destination,
        departureDate,
        price: 1699,
        originalPrice: 4500,
        savings: 62,
        cabinClass: cabinClass || 'business'
      }
    ];

    res.status(200).json({
      success: true,
      data: mockResults
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search flights'
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { email, name, phone, flightData } = req.body;

    if (!email || !name || !flightData) {
      return res.status(400).json({
        success: false,
        message: 'Email, name, and flight data are required'
      });
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ email, name, phone });
    }

    // Create booking
    const booking = await Booking.create({
      userId: user.id,
      origin: flightData.origin || 'Unknown',
      destination: flightData.destination || 'Unknown',
      departureDate: flightData.departureDate || new Date(),
      returnDate: flightData.returnDate || null,
      cabinClass: flightData.cabinClass || 'business',
      bookingLink: `https://airtravlerr.onrender.com/booking/${Date.now()}`
    });

    res.status(201).json({
      success: true,
      data: {
        bookingId: booking.id,
        bookingLink: booking.bookingLink,
        user: {
          email: user.email,
          name: user.name
        }
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: User, attributes: ['id', 'email', 'name', 'phone'] }],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};