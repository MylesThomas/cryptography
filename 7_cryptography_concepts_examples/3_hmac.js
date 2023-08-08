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