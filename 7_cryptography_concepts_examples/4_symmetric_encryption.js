const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

/// Cipher

const message = 'i like turtles';
const key = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv('aes256', key, iv);

console.log("message: ", message);
console.log("key: ", key);
console.log("iv: ", iv);
console.log("cipher: ", cipher);

/// Encrypt

const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
console.log(`encryptedMessage: ${encryptedMessage}`);

/// Decrypt

const decipher = createDecipheriv('aes256', key, iv);
console.log("decipher: ", decipher)
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
console.log(`decryptedMessage: ${decryptedMessage.toString('utf-8')}`);