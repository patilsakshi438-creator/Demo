const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not configured.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    if (
      error.code === 'ECONNREFUSED' ||
      error.message.includes('ECONNREFUSED')
    ) {
      console.error(
        'MongoDB connection failed: MongoDB is not running on 127.0.0.1:27017. Start MongoDB locally or update MONGODB_URI in backend/.env to a valid MongoDB Atlas connection string.'
      );
    } else {
      console.error('MongoDB connection failed:', error.message);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
