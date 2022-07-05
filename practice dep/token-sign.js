const jwt = require('jsonwebtoken');

//Este "secret", deberia estar en una variable, de entorno, ya que nadie deberia saber esta llave
const secret = 'myCat';
const payload = {
    /*-----------------------------------------------------------
    El minimo estandar para payload, es que tenga un sub (subject)
    que es el identificador de ese token 
    -------------------------------------------------------------*/
    sub: 1,
    role: 'customer'
}

function signToken(payload, secret) {
    return jwt.sign(payload, secret);
}

const token = signToken(payload,secret);
console.log(token);