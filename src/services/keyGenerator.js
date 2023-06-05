function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

async function exportPrivateCryptoKey(key) {
  const exported = await window.crypto.subtle.exportKey("pkcs8", key)
  const exportedAsString = ab2str(exported)
  const exportedAsBase64 = window.btoa(exportedAsString)
  const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`

  return pemExported
}

async function exportPublicCryptoKey(key) {
  const exported = await window.crypto.subtle.exportKey("spki", key)
  const exportedAsString = ab2str(exported)
  const exportedAsBase64 = window.btoa(exportedAsString)
  const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`

  return pemExported
}

export const generateKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  )
  const privateKey = await exportPrivateCryptoKey(key.privateKey)
  const publicKey = await exportPublicCryptoKey(key.publicKey)
  return { privateKey, publicKey }
}
