import bcrypt from 'bcryptjs';

export async function verifyPasskey(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export async function hashPasskey(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}
