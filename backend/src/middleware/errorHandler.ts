import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: { message: err.message, ...(err.code ? { code: err.code } : {}) },
    });
    return;
  }

  // Log unexpected errors server-side only
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');

  res.status(500).json({
    success: false,
    error: { message: 'Something went wrong. Please try again.', code: 'INTERNAL_ERROR' },
  });
};

export const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({ success: false, error: { message: 'Route not found', code: 'NOT_FOUND' } });
};
