const validator = require('validator');

exports.validateEmail = (email) => {
  return validator.isEmail(email);
};

exports.validatePhone = (phone) => {
  return validator.isMobilePhone(phone);
};

exports.validateDate = (date) => {
  return validator.isISO8601(date);
};

exports.validateURL = (url) => {
  return validator.isURL(url);
};

exports.validateNotEmpty = (value) => {
  return !validator.isEmpty(value);
};

exports.validateLength = (value, min, max) => {
  return validator.isLength(value, { min, max });
};

exports.validateCabinClass = (cabin) => {
  return ['economy', 'business', 'first'].includes(cabin);
};

exports.validateBookingStatus = (status) => {
  return ['pending', 'confirmed', 'cancelled'].includes(status);
};