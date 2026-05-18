import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const signAccessToken = (payload: JwtPayload): string =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN ?? '15m' });

export const signRefreshToken = (payload: JwtPayload): string =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d' });

export const verifyAccessToken = (token: string): JwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

export const verifyRefreshToken = (token: string): JwtPayload =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
