const { generateKeyPairSync } = require('crypto');

// first arg ie. rsa: crypto system you would like to use
// - rsa: rivest shamir adleman
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, // the length of your key in bits
  publicKeyEncoding: {
    type: 'spki', // recommended to be 'spki' by the Node.js docs
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
    format: 'pem',

    // optional: add passphrase to private key for more security
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',

  },
});

console.log(publicKey);
console.log(privateKey);

// export from this file to be put to use!
module.exports = {
    privateKey, publicKey
}