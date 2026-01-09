// file: functions/_shared/passKeyAuth.ts
const encoder = new TextEncoder();

export async function hashPasskey(
  password: string,
  saltBytes = 16,
  iterations = 100_000,
  keyLen = 32
) {
  // generate random salt
  const salt = crypto.getRandomValues(new Uint8Array(saltBytes));
  // import key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  // derive bits
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt,
      iterations,
    },
    keyMaterial,
    keyLen * 8
  );
  const derivedKey = new Uint8Array(derivedBits);
  // encode salt and derived key as base64 for storage: iterations$salt$b64key
  const saltB64 = btoa(String.fromCharCode(...salt));
  const keyB64 = btoa(String.fromCharCode(...derivedKey));
  return `${iterations}$${saltB64}$${keyB64}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [iterationsStr, saltB64, keyB64] = stored.split('$');
  const iterations = Number(iterationsStr);
  const salt = Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0));
  const expectedKey = Uint8Array.from(atob(keyB64), (c) => c.charCodeAt(0));

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt,
      iterations,
    },
    keyMaterial,
    expectedKey.length * 8
  );
  const derivedKey = new Uint8Array(derivedBits);

  // constant-time compare
  if (derivedKey.length !== expectedKey.length) return false;
  let diff = 0;
  for (let i = 0; i < derivedKey.length; i++) diff |= derivedKey[i] ^ expectedKey[i];
  return diff === 0;
}
