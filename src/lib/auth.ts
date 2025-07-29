export function isAdmin(email: string | undefined | null): boolean {
  if (!email || !process.env.ADMIN_EMAILS) return false;
  return process.env.ADMIN_EMAILS.split(',').map(e => e.trim()).includes(email);
} 