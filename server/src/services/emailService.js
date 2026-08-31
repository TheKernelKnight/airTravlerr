// Note: This is a mock email service. Replace with actual email provider (SendGrid, Mailgun, etc.)

const sendEmail = async (to, subject, html, text) => {
  try {
    console.log(`📧 Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${text || html}`);
    
    // Mock successful send
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
      to
    };
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

exports.sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to AirTravelerr!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Welcome to AirTravelerr!</h1>
      <p>Hi ${user.name},</p>
      <p>Thank you for joining AirTravelerr. You now have access to exclusive insider fares and discounts on business and first-class flights.</p>
      <p>Start saving up to 64% on your next flight!</p>
      <a href="http://localhost:5173" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 50px; margin-top: 20px;">
        Start Searching
      </a>
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        Happy travels,<br>
        The AirTravelerr Team
      </p>
    </div>
  `;
  const text = `Welcome to AirTravelerr! Hi ${user.name}, Thank you for joining AirTravelerr. Start saving up to 64% on your next flight!`;

  return sendEmail(user.email, subject, html, text);
};

exports.sendBookingConfirmation = async (user, booking) => {
  const subject = 'Your Booking Confirmation - AirTravelerr';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Booking Confirmation</h1>
      <p>Hi ${user.name},</p>
      <p>Your booking has been confirmed!</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>From:</strong> ${booking.origin}</p>
        <p><strong>To:</strong> ${booking.destination}</p>
        <p><strong>Departure:</strong> ${new Date(booking.departureDate).toLocaleDateString()}</p>
        <p><strong>Cabin Class:</strong> ${booking.cabinClass}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
      </div>
      <a href="${booking.bookingLink}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 50px; margin-top: 20px;">
        View Your Booking
      </a>
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        Safe travels,<br>
        The AirTravelerr Team
      </p>
    </div>
  `;
  const text = `Booking Confirmation\n\nBooking ID: ${booking.id}\nFrom: ${booking.origin}\nTo: ${booking.destination}\nDeparture: ${new Date(booking.departureDate).toLocaleDateString()}`;

  return sendEmail(user.email, subject, html, text);
};

exports.sendNewsletterConfirmation = async (email) => {
  const subject = 'You\'re Subscribed! - AirTravelerr Newsletter';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">You're Subscribed!</h1>
      <p>Thank you for subscribing to the AirTravelerr newsletter.</p>
      <p>You'll receive exclusive fare alerts and travel tips delivered to your inbox weekly.</p>
      <p style="margin-top: 30px; color: #666; font-size: 14px;">
        Happy travels,<br>
        The AirTravelerr Team
      </p>
    </div>
  `;
  const text = `You're Subscribed!\n\nThank you for subscribing to the AirTravelerr newsletter.`;

  return sendEmail(email, subject, html, text);
};