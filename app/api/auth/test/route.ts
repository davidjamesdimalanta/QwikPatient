import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ 
      authenticated: false 
    }, { status: 401 });
  }

  return NextResponse.json({ 
    authenticated: true,
    user: session.user
  });
}
