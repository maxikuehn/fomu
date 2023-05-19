const { subtle } = require("crypto").webcrypto

async function importPrivateKey() {
  const pem = process.env.PRIVATE_KEY
  const pemHeader = "-----BEGIN PRIVATE KEY-----"
  const pemFooter = "-----END PRIVATE KEY-----"
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  )
  const binaryDer = Buffer.from(pemContents, "base64")
  const key = await subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  )

  return key
}

async function decrypt(ciphertext) {
  const privateKey = await importPrivateKey()
  const decrypted = await subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    ciphertext
  )
  return new TextDecoder().decode(decrypted)
}

module.exports = { decrypt }
