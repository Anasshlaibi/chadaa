import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * is_positive — Backend-style stock check for the frontend.
 * Handles various truthy values from Google Sheets/Supabase.
 */
export function is_positive(val: unknown): boolean {
  if (val === true || val === 'true') return true;
  if (val === false || val === 'false' || val === null || val === undefined) return false;
  const s = String(val).toLowerCase().trim().replace(/['"]/g, '');
  return ['true', '1', 't', 'yes', 'en stock', 'oui', 'vrai', 'on', 'available'].includes(s);
}

/**
 * checkStock — Alias for is_positive as requested.
 */
export const checkStock = is_positive;

/**
 * Builds a pre-filled WhatsApp URL containing the user's quote cart items.
 */
export function buildWhatsAppQuoteUrl(
  items: Array<{ name: string; quantity: number }>,
  contact?: { companyName?: string; contactName?: string; phone?: string }
): string {
  const lines: string[] = ['Bonjour Chada Alyasmin, je souhaite un devis pour :'];
  for (const item of items) {
    lines.push(`• ${item.name} × ${item.quantity}`);
  }
  if (contact?.contactName || contact?.companyName || contact?.phone) {
    lines.push('');
    if (contact.contactName) lines.push(`Nom : ${contact.contactName}`);
    if (contact.companyName) lines.push(`Entreprise : ${contact.companyName}`);
    if (contact.phone) lines.push(`Tél : ${contact.phone}`);
  }
  return `https://wa.me/212661138204?text=${encodeURIComponent(lines.join('\n'))}`;
}
