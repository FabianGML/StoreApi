const jwt = require('jsonwebtoken');

//Este "secret", deberia estar en una variable, de entorno, ya que nadie deberia saber esta llave
const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1NjM3MzAxMH0.15-9k2YTQ3H8eelNqVzcwfwF20WJXlZQobf5UiG5O_8';

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token,secret);
console.log(payload);   