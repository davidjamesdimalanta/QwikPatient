import { DefaultSession } from 'next-auth';

export interface Nurse {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Patient {
  id: string;
  name: string;
  address: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export interface Visit {
  id: string;
  patientName: string;
  date: Date;
}

export interface JWTPayload {
  id: string;
  role: string;
}

declare module 'next-auth' {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      role?: string;
      id?: string;
    } & DefaultSession['user']
  }

  interface JWT {
    role?: string;
    id?: string;
  }
}