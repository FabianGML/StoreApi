const bcrypt = require('bcrypt');

async function verifyPassword(){
    const myPassword = 'admin';
    const hash = '$2b$10$4gnDVI.wyB9E42koPsPOc.nwqxxBabdfF8zYMZ9kSP4qrM6KJHAHG';
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
}

verifyPassword()