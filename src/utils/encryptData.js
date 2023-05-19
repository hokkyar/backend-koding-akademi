require('dotenv').config()
const crypto = require('crypto')

const key = crypto.scryptSync(process.env.ENCRYPT_KEY, 'salt', 32)

function encryptData(input) {
  const cipher = crypto.createCipheriv(process.env.ENCRYPT_ALGORITHM, key, process.env.ENCRYPT_IV)
  let encrypted = cipher.update(input, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

function decryptData(encryptedData) {
  const decipher = crypto.createDecipheriv(process.env.ENCRYPT_ALGORITHM, key, process.env.ENCRYPT_IV)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

module.exports = { encryptData, decryptData }
