type KeyObject = {
  key: CryptoKey
  iv: ArrayBuffer
}

export async function PBKDF2(salt: string, password: string, keyLength: number): Promise<ArrayBuffer> {
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

export async function getKey(derivation: ArrayBuffer): Promise<KeyObject> {
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

export async function encrypt(text: string, keyObject: KeyObject): Promise<ArrayBuffer> {
  const textEncoder = new TextEncoder()
  const textBuffer = textEncoder.encode(text)
  const encryptedText = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: keyObject.iv }, keyObject.key, textBuffer)
  return encryptedText
}

export async function decrypt(encryptedText: ArrayBuffer, keyObject: KeyObject) {
  const textDecoder = new TextDecoder('utf-8')
  const decryptedText = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: keyObject.iv }, keyObject.key, encryptedText)
  return textDecoder.decode(decryptedText)
}
