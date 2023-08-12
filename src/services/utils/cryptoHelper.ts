export async function PBKDF2(salt: string, password: string, keyLength: number) {
  const iterations = 1000000
  const hash = 'SHA-256'
  const textEncoder = new TextEncoder()
  const passwordBuffer = textEncoder.encode(password)
  const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits'])

  const saltBuffer = textEncoder.encode(salt)
  const params = { name: 'PBKDF2', hash: hash, salt: saltBuffer, iterations: iterations }
  const derivation = await crypto.subtle.deriveBits(params, importedKey, keyLength * 8)

  return derivation
}

export async function getKey(derivation: ArrayBuffer) {
  const ivlen = 16
  const keylen = 32
  const derivedKey = derivation.slice(0, keylen)
  const iv = derivation.slice(keylen)
  const importedEncryptionKey = await crypto.subtle.importKey('raw', derivedKey, { name: 'AES-CBC' }, false, [
    'encrypt',
    'decrypt',
  ])
  return {
    key: importedEncryptionKey,
    iv: iv,
  }
}
