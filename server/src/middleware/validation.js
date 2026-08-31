const { body, validationResult } = require('express-validator');

exports.validateSearch = [
  body('origin').notEmpty().withMessage('Origin is required'),
  body('destination').notEmpty().withMessage('Destination is required'),
  body('departureDate').isISO8601().withMessage('Valid departure date is required'),
  body('cabinClass').optional().isIn(['economy', 'business', 'first']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

exports.validateBooking = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').optional().isString(),
  body('flightData.origin').notEmpty().withMessage('Origin is required'),
  body('flightData.destination').notEmpty().withMessage('Destination is required'),
  body('flightData.departureDate').isISO8601().withMessage('Valid departure date is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

exports.validateNewsletter = [
  body('email').isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];