import 'dotenv/config';
import { connectDB } from './config/database';
import { logger } from './utils/logger';
import app from './app';

// Validate required environment variables at startup
const REQUIRED_ENV = ['DATABASE_URL', 'JWT_SECRET', 'REFRESH_TOKEN_SECRET'];
REQUIRED_ENV.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const PORT = Number(process.env.PORT ?? 3000);

const start = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`Inventia API running on port ${PORT} [${process.env.NODE_ENV ?? 'development'}]`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.error({ reason }, 'Unhandled promise rejection');
    process.exit(1);
  });
};

start();
