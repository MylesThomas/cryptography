# Cryptography

## Project Setup

Open VSCode terminal or a command prompt in Windows.

Setup the local project directory:

```sh
mkdir cryptography
cd cryptography
```

Head to github.com and create a new repository named cryptography.

After completing that, create a new repository on the command line:

```sh
echo "# cryptography" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/MylesThomas/cryptography.git
git push -u origin main
```

Save this markdown file into cryptography as `instructions.md`, then open up a new VSCode instance and Open folder > cryptography.

Save this file and update git before beginning the project:

```sh
cd cryptography
git status
git add .
git commit -m "Completed project setup"
git push -u origin main
git status
git log --oneline
q
```

## Fireship - 7 Cryptography Concepts EVERY Developer Should Know

[Link to youtube video](https://www.youtube.com/watch?v=NuyzuNBFWxQ)

### What is Cryptography

Cryptography: Makes the internet secure
- mysterious art that bring security/privacy

Notes:
- Computer do what we tell them to do
    - We don't want them to show some types of data

What cryptography does:
1. Take useful bytes of data
2. Scramble them up with an algo (makes computer almost impossible to use the data now)

Best way to learn this: Get hands on!
- We will use node.js and 'crypto' library

### Brief History of Cryptography

Cryptography: Creating secrets

Notes:
- Julius Caeser scrambled letters of the alphabet
- Nowadays, algos can be beaten by quantum computers
- It is always evolving!
    - Just because something is safe today, does not mean it will be tomorrow

Some important concepts to understand:
- Hashing
- Encryption
- Signing

### 1. Hash

Hash: 
- "Chop and mix"

Steps:

1. Take input of any length
- Example: "Hello world"

2. Pass it off to a hashing function
- Popular hashing functions:
    - md5
    - sha
    - argon2

3. Function returns a fixed-length value
- Looks like meaningless garbage

Notes:
- Important: Function will always return the same output, when given the same input
- Developers can store important data in hashes (without need to know the actual data)
    - Example: User passwords
        - You do not store true password in database (If hacker gets database, it is over)
        - When the data is hashed, the hacker has to crack that hash to figure out what the true password is

Our first example (and the rest) can be found in the following link: [Fireship.io](https://fireship.io/lessons/node-crypto-examples/)

Let's make sure node.js is installed first:

```sh
node -v # Should return 'v18.17.0' or something similar
```

Create a sub-directory to store your javascript files:

```sh
mkdir 7_cryptography_concepts_examples
cd 7_cryptography_concepts_examples
```

Now, let's take this example of creating a hash in node.js:

```sh
echo > 1_hash.js
```

```js
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
```

Run the code: Ctrl-Alt-N

Notes on this code:
- We are using hexadecimal format, but base 64 is common too

This is not sufficient for storing a password in a database!


### 2. Salt

Why do we need salt?
- The fact that a hashing function always returns the same value is a problem for passwords 
    - Especially when humans make dumb passwords like 'abc123'
    - If a hacker gets the database and the passwords are hashed, they can often use something ie. a rainbow table and find a bunch of commonly used passwords

Salt: A random value added to the password, before it is hashed
- Result: Salt + Hash
    - Makes it much harder to guess

Let's try another example:

```sh
echo > 2_salt.js
```

```js
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, password: `${salt}:${hashedPassword}` }
  
    users.push(user);

    // 
    console.log("email: ", email)
    console.log("password: ", password)
    console.log("salt: ", salt)
    console.log("hashedPassword: ", hashedPassword)
    console.log("user: ", user)
    

    return user
}

function login(email, password) {
    const user = users.find(v => v.email === email);
  
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}

// init a blank database
const users = [];
// signup 2 users
const user1 = signup('foo@bar.com', 'pa$$word'); 
const user2 = signup('mylescgthomas@gmail.com', 'pa$$word123'); 
// look at database
console.log("users: ", users);
// try logging in
const result1 = login('foo@bar.com', 'pa$$word')
console.log(result1) // login success!
const result2 = login('mylescgthomas@gmail.com', 'pa$$word123')
console.log(result2) // login success!
const result3 = login('mylescgthomas@gmail.com', 'asdf')
console.log(result3) // login fail!

```

Run the code: Ctrl-Alt-N

Notes:
- Salt: Random set of character (random hex)
- scryptSync: used to hash
    - makes it very difficult to beat with brute force
    - used as a proof of work algo in crypto mining
- Recommended key length: 64
- We prepend the salt to the existing hashedPassword
    - put a semicolon between
- When user goes to login, we do the following:
    - Grab salt from database
    - Re-create initial hash

- Instead of using ==, we use the function timeSafeEqual
    - prevents timing attacks
        - timing attacks: hacker measures amount of time it takes to perform an operation, to extract information about the output value

### 3. HMAC

HMAC: Hash-based message authentication code
- Quick definition: A hash, that also requires a shared key (password)
    - Only person who can create the same hash signature, must also have the corresponding password/key

Example: JSON web token for authentication on the web
- When a user logs in on a trusted server, a token is generated with a key
    - Client and server can pass it back and forth 
    - Server can trust it because only somebody with that secret key could have generated that hash signature

Example in node:

```sh
echo > 3_hmac.js
```

```js
const { createHmac } = require('crypto');

const password = 'super-secret!'; // secret key
const message = '🎃 hello jack'  // message we'd like to hash

// provide key when creating hash ie. password
const hmac = createHmac('sha256', password).update(message).digest('hex');
console.log(hmac)

// create another with same hash
const password2 = 'super-secret!';
const message2 = '🎃 hello jack'
const hmac2 = createHmac('sha256', password2).update(message2).digest('hex');
console.log(hmac2) // same as above

// create another with same hash
const password3 = 'other-password';
const message3 = '🎃 hello jack'
const hmac3 = createHmac('sha256', password3).update(message3).digest('hex');
console.log(hmac3) // NOT same as above (we used a different password to hash...)
```

Run the code: Ctrl-Alt-N

Notes:
- When keeping the message constant ie. message == message2 == message3:
    - We get the same hash when the same password is used
    - We do NOT get the same password if a different hash is used

### 4. Symmetric Encryption

What happens when you share a secret with someone, and also want them to be able to read the original message?

This is where encryption comes in!

What is Encryption?

Encryption:
- Take an input message
- Cipher text: Scramble up bytes to make it un-readable
    
- Key/password: Provided to allow someone else to decrypt the cipher text

Notes:
- Typically: Cipher text is Randomized, so each time you get a different output
    - Even if the key/message are the exact same!

Example #1: Symmetric
- Meaning of Symmetric: There is 1 shared password
    - Both sender/receiver need the same password

```sh
echo > 4_symmetric_encryption.js
```

```js
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
```

Run the code: Ctrl-Alt-N

Notes:
- createCipheriv: IV = Initialization Vector
- key: 32 bytes
- iv: 16 bytes
    - randomizes output when it is encrypted
        - prevents identical sequences of text (makes it harder for hackers to break the encryption)

- Just like a hash, creating a cypher is dependant on the following:
    - choice of encryption algo
        - aes (advanced encryption standard)
    - key
    - iv

- The cipher is finalized by adding cipher.final('hex' to the encrypted message)
    - The cipher can no longer be used to encrypt data

- How to decipher:
    - Create decipher object with same encryption algo/key/iv
    - Use same basic pattern with .update()/.final() to turn the encrypted message back into plain text

However, there is 1 huge limitation with symmetric encryption: Both the sender/receiver need to share a password!
- Not practical for 2 different parties to agree upon a shared password

### 5. Keypairs

Keypairs: Math comes to the rescue!

Instead of 1 key, we will use 2 keys that are mathematically linked:
- Private key: Kept secret
- Public key: Can be shared with other people

Analogy: Mailbox
- Public key: Anybody can drop their mail into the slot
- Private key: Only the mailman can open up the mailbox and look inside
    - Can only be done by the owner of the key!

Another example in node.js:

```sh
echo > 5_keypairs.js
```

```js
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
```

Run the code: Ctrl-Alt-N

Notes:
- RSA: The Rivest-Shamir-Adleman (RSA) encryption algorithm is an asymmetric encryption algorithm that is widely used in many products and services
- PEM: Privacy Enhanced Mail (PEM) is an email security standard to provide secure electronic mail communication over the internet.

### 6. Asymmetric Encryption

Asymmetric Encryption:
- Used anytime you go to a website using HTTPS

How it works:
- Browser automatically finds public key of SSL certificate
    - this is installed on the website

- Public key is used to encrypt anything you send to the website
    - prevents hackers from getting anything useful when data is in transit

- Private key is used by the trusted website to decrypt the data 

```sh
echo > 6_asymmetric_encryption.js
```

```js
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
```

Run the code: Ctrl-Alt-N

Notes:
- 

### 7. Signing

Most of the time: You do not need to encrypt data, but you need to validate that it came from a trusted party.

Signing: 

What is a digital signature?

An example to help explain:
- You are expecting a letter in the mail with sensitive info
    - You need to trust it came from the correct person, so you require them to sign the document in blood
    - There is also a special seal on the letter
        - If the seal is broken, we know it was tampered with

Digital signing steps:

1. Sender of message uses private key to sign a hash of the original input message
- Private key: Guarantees the authenticity (blood)
- Hash: Guarantees message cannot be tampered with (it would produce an entirely different signature...)

2. Recipient of message used public key to validate the authenticity of the message
- 

3. 

Example:

```sh
echo > 7_signing.js
```

```js

```

Run the code: Ctrl-Alt-N

Notes:
- RSA + HSA: RSA crypto algorithm used with SHA hashing
- Signature is created with private key
    - We can attach a signature to the original message before sending
- Receiver creates a verifier
    - Updates original message
    - Verify signature with sender's public key

- If signature is forged or tampered with: Verifier will fail
    - If not: Verifier will not fail!

### Optional: Challenge

Log into the github repo and attempt to use hacking skills to turn a hash into the original message.

Link to file `hack.js`: [Link](https://github.com/fireship-io/node-crypto-examples/blob/main/src/hack.js)

My answer:

```sh
echo > bonus_hack.js
```

```js
///// Challenge /////

// Below is a hash 
// Use your hacking skills to crack it!

const hash = '5e7d28e2cfff93edefb2d15abad07ec5';


// When you figure it out, create a Pull Request on github with value. 
// First correct PR wins a Lifetime PRO  membership and T-shirt

///// ANSWER /////

const hacked = 'superhacker';
```

Run the code: Ctrl-Alt-N

Notes:
- Not finished...

### Git

Now that you have completed this youtube tutorial, update the cryptography Git/Github repositories:

```sh
cd cryptography
git status
git add .
git commit -m "Completed 'Fireship - 7 Cryptography Concepts EVERY Developer Should Know'"
git push -u origin main
git status
git log --oneline
q
```