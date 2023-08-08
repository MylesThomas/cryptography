const {  publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./5_keypairs');

// make a private message
const secretMessage = "an extremely private message!";
console.log("secretMessage: ", secretMessage)

// drop it in the mailbox
// - only owner of mailbox can read it now!
const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(secretMessage)
  );

console.log("encryptedData: ", encryptedData.toString('hex'))

// in the future....

// unlock the mailbox with the private key
const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
);

// view results
console.log("decryptedData: ", decryptedData.toString('utf-8'));