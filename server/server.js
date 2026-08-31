require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database error:', error.message);
    // Server still starts even without database
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (without DB)`);
    });
  }
};

startServer();