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
