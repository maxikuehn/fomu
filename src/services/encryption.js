function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

const encode = (data) => {
  const encoder = new TextEncoder()
  return encoder.encode(data)
}

function importPublicKey(pem) {
  const pemHeader = "-----BEGIN PUBLIC KEY-----"
  const pemFooter = "-----END PUBLIC KEY-----"
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  )
  const binaryDerString = window.atob(pemContents)
  const binaryDer = str2ab(binaryDerString)

  return window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"]
  )
}

export async function encrypt(data, keyData) {
  const encoded = encode(data)
  const publicKey = await importPublicKey(keyData)
  const buffer = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoded
  )
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
}
