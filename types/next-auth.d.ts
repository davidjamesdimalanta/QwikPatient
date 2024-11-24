import { DefaultSession } from 'next-auth';

export interface Nurse {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
}

export interface Visit {
  id: string;
  patientName: string;
  date: Date;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
}

export interface Assignment {
  id: string;
  nurseId: string;
  patientId: string;
  nurse?: Nurse;
  patient?: Patient;
}

export interface Task {
  id: string;
  nurseId: string;
  patientId: string;
  title?: string;
  status?: string;
  dueDate?: Date;
}

export interface Schedule {
  id: string;
  nurseId: string;
  patientId: string;
  date: Date;
  status: 'pending' | 'confirmed';
  nurse?: Nurse;
  patient?: Patient;
}

export interface JWTPayload {
  id: string;
  email: string;
  name?: string;
  role?: string;
  iat: number;
  exp?: number;
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