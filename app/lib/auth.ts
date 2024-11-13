import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/types/next-auth';

export async function getNurseIdFromToken(request: NextRequest) {
  const token = await getToken({ req: request });
  return token?.id as string;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
      console.error('NEXTAUTH_SECRET is not defined');
      return null;
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;
    
    // Verify token hasn't expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      console.error('Token has expired');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
} 