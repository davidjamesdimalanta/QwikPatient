import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/db';
import { JWTPayload } from '@/types/next-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const payload = verifyToken(token) as JWTPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (user) {
      return NextResponse.json({
        isLoggedIn: true,
        role: user.role,
        name: user.name,
      });
    } else {
      return NextResponse.json({ isLoggedIn: false });
    }
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
