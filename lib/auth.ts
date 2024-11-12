import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/types/next-auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
} 