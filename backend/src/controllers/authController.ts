import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import { User } from '../models/User';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { sendError, sendSuccess } from '../utils/response';

const registerSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  password: z.string().min(8).max(128),
  role:     z.enum(['user', 'manager', 'admin']).optional().default('user'),
});

const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });
    if (existing) { sendError(res, 'Email already registered', 409, 'EMAIL_EXISTS'); return; }

    const rounds = Number(process.env.BCRYPT_ROUNDS ?? 12);
    const passwordHash = await bcrypt.hash(data.password, rounds);

    const user = await User.create({ name: data.name, email: data.email, passwordHash, role: data.role });

    const payload = { userId: (user._id as any).toString(), email: user.email, role: user.role };
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    sendSuccess(res, { user, accessToken, refreshToken }, 201);
  } catch (err) { next(err); }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email }).select('+passwordHash');
    if (!user) { sendError(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS'); return; }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) { sendError(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS'); return; }

    if (!user.isActive) { sendError(res, 'Account is deactivated', 403, 'ACCOUNT_INACTIVE'); return; }

    const payload = { userId: (user._id as any).toString(), email: user.email, role: user.role };
    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    sendSuccess(res, { user, accessToken, refreshToken });
  } catch (err) { next(err); }
};

export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) { sendError(res, 'Refresh token required', 400); return; }

    let payload;
    try { payload = verifyRefreshToken(refreshToken); }
    catch { sendError(res, 'Invalid or expired refresh token', 401, 'INVALID_REFRESH_TOKEN'); return; }

    const user = await User.findById(payload.userId);
    if (!user || !user.isActive) { sendError(res, 'User not found', 401); return; }

    const newPayload = { userId: (user._id as any).toString(), email: user.email, role: user.role };
    const accessToken = signAccessToken(newPayload);
    sendSuccess(res, { accessToken });
  } catch (err) { next(err); }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user!.userId);
    if (!user) { sendError(res, 'User not found', 404, 'USER_NOT_FOUND'); return; }
    sendSuccess(res, { user });
  } catch (err) { next(err); }
};
