const crypto = require('crypto');

exports.generateId = () => {
  return crypto.randomUUID();
};

exports.generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

exports.generateReference = (prefix = 'AT') => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

exports.formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

exports.calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

exports.truncateText = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

exports.isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

exports.retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await exports.sleep(delay * (i + 1));
    }
  }
};

exports.extractErrorMessage = (error) => {
  if (error.message) return error.message;
  if (error.errors && error.errors.length) {
    return error.errors[0].message;
  }
  return 'An unknown error occurred';
};