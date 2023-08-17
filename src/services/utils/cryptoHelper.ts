import { secp256k1 } from 'ethereum-cryptography/secp256k1.js'

type KeyObject = {
  key: CryptoKey
  iv: ArrayBuffer
}

export async function stretchKey_PBKDF2(salt: string, password: string): Promise<ArrayBuffer> {
  const iterations = 1000000
  const hash = 'SHA-256'
  const keyLength = 32
  const textEncoder = new TextEncoder()
  const passwordBuffer = textEncoder.encode(password)
  const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits'])

  const saltBuffer = textEncoder.encode(salt)
  const params = { name: 'PBKDF2', hash: hash, salt: saltBuffer, iterations: iterations }
  const derivation = await crypto.subtle.deriveBits(params, importedKey, keyLength * 8)

  return derivation
}

export async function createAccountKeyMaster_AESCBC(derivation: ArrayBuffer): Promise<KeyObject> {
  const keylen = 16
  const iv = derivation.slice(0, keylen)
  const importedEncryptionKey = await crypto.subtle.importKey('raw', iv, { name: 'AES-CBC' }, false, [
    'encrypt',
    'decrypt',
  ])
  return {
    key: importedEncryptionKey,
    iv: iv,
  }
}

export async function createAccountKeyIdentityPrivate_SHA256(accountKeyMaster: ArrayBuffer): Promise<ArrayBuffer> {
  const accountKeyIdentityPrivate = await crypto.subtle.digest('SHA-256', accountKeyMaster)
  return accountKeyIdentityPrivate
}

export async function generatePublicKey_secp256k1(accountKeyIdentityPrivate: ArrayBuffer) {
  const publicKeyUint8Array = new Uint8Array(accountKeyIdentityPrivate)
  const publicKey = secp256k1.getPublicKey(publicKeyUint8Array)
  return publicKey
}

export async function signMessage(privateKey: CryptoKey, message: string): Promise<ArrayBuffer> {
  const textEncoder = new TextEncoder()
  const textBuffer = textEncoder.encode(message)
  const signature = await window.crypto.subtle.sign(
    {
      name: 'AES-CBC',
      hash: { name: 'SHA-256' },
    },
    privateKey,
    textBuffer
  )

  return signature
}

export async function verifyMessage(publicKey: CryptoKey, signature: ArrayBuffer, message: string): Promise<boolean> {
  const textEncoder = new TextEncoder()
  const textBuffer = textEncoder.encode(message)
  let result = await window.crypto.subtle.verify(
    {
      name: 'AES-CBC',
      hash: { name: 'SHA-256' },
    },
    publicKey,
    signature,
    textBuffer
  )

  return result
}

export async function encrypt(text: string, keyObject: KeyObject): Promise<ArrayBuffer> {
  const textEncoder = new TextEncoder()
  const textBuffer = textEncoder.encode(text)
  const encryptedText = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: keyObject.iv }, keyObject.key, textBuffer)
  return encryptedText
}

export async function decrypt(encryptedText: ArrayBuffer, keyObject: KeyObject): Promise<string> {
  const textDecoder = new TextDecoder('utf-8')
  const decryptedText = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: keyObject.iv }, keyObject.key, encryptedText)
  return textDecoder.decode(decryptedText)
}
