import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * is_positive — Backend-style stock check for the frontend.
 * Handles various truthy values from Google Sheets/Supabase.
 */
export function is_positive(val: any): boolean {
  if (val === true || val === 'true') return true;
  if (val === false || val === 'false' || val === null || val === undefined) return false;
  const s = String(val).toLowerCase().trim().replace(/['"]/g, '');
  return ['true', '1', 't', 'yes', 'en stock', 'oui', 'vrai', 'on', 'available'].includes(s);
}

/**
 * checkStock — Alias for is_positive as requested.
 */
export const checkStock = is_positive;
