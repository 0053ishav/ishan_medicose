import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in'? z.string().optional(): z.string().min(3),
  lastName: type === 'sign-in'? z.string().optional(): z.string().optional(),
  address: type === 'sign-in'? z.string().optional(): z.string().max(100),
  city: type === 'sign-in'? z.string().optional(): z.string().min(2).max(15),
  state: type === 'sign-in'? z.string().optional(): z.string().min(2),
  postalCode: type === 'sign-in'? z.string().optional(): z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in'? z.string().optional(): z.string().min(3),
  // both
  email: z.string().email(),
  password: z.string().min(8),
});

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));