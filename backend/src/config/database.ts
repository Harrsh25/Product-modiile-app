import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL environment variable is not set');

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error({ err }, 'MongoDB connection failed');
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    logger.error({ err }, 'MongoDB runtime error');
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });
};
