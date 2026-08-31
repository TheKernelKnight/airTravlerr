const User = require('../models/User');

exports.subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    let user = await User.findOne({ where: { email } });
    
    if (user) {
      user.newsletterSubscribed = true;
      await user.save();
    } else {
      user = await User.create({
        email,
        name: name || 'Subscriber',
        newsletterSubscribed: true
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: user.email,
        subscribed: user.newsletterSubscribed
      }
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter'
    });
  }
};