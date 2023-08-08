const { createHash } = require('crypto'); // import from built-in node.js module

// Create a string hash
// - input: string
// - output: hashed string
function hash(str) {
    // algo of choice: sha256 (secure hashing algorithm)
    return createHash('sha256').update(str).digest('hex'); // .digest() == output
}

// Compare two hashed passwords

let password1 = 'hi-mom!';
const hash1 = hash(password1);
let password2 = 'hi-mom!';
const hash2 = hash(password2);

console.log(password1)
console.log(password2)
console.log(hash1)
console.log(hash2)

const match = hash1 === hash2;

console.log(match ? '✔️  good password' : '❌  password does not match');