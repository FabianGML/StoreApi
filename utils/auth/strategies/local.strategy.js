const { Strategy } =  require('passport-local');


const AuthService = require('./../../../services/auth.service');
const service = new AuthService();

const localStrategy = new Strategy({
        /*-------------------------------------------------------------
        Por defecto, esta estrategia recibe el campo username y password, 
        si queremos cambiar el nombre de esos campos, se utilizan los 
        siguientes atributos
        // passwordField 
        ----------------------------------------------------------------*/
        usernameField: 'email',
    },
    async (email, password, done) => {
        try {
            const user = await service.getUser(email, password)
            done(null, user);
        } catch(error){
        //Se coloca false, para indicar que no fue posible hacer la validacion
        done(error, false);
        }
    }
);

module.exports = localStrategy;