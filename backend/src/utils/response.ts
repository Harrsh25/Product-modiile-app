import { Response } from 'express';

interface Meta { page?: number; limit?: number; total?: number; totalPages?: number }

export const sendSuccess = (res: Response, data: unknown, statusCode = 200, meta?: Meta) =>
  res.status(statusCode).json({ success: true, data, ...(meta ? { meta } : {}) });

export const sendError = (res: Response, message: string, statusCode = 400, code?: string) =>
  res.status(statusCode).json({ success: false, error: { message, ...(code ? { code } : {}) } });
