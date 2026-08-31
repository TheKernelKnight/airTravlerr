const crypto = require('crypto');

exports.generateBookingReference = () => {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
};

exports.generateBookingLink = (bookingId) => {
  return `https://airtravelerr.com/booking/${bookingId}`;
};

exports.calculateSavings = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};