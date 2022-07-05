const boom = require('@hapi/boom');

const { config } = require('./../config/config')

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next()
    } else {
        next(boom.unauthorized());
    }
}

function checkAdminRole(req, res, next){
    const user = req.user;
    if(user.role === 'admin'){
        next()
    } else {
        next(boom.unauthorized());
    }
}

/*
Con esta funcion, se puede hacer mas dinamico, que roles podemos dejar pasar a un endpoint,
con el uso de closures, la funcion "checkAdminRole" unicamente deja pasar un solo tipo de rol,
pero si queremos endpoints que tengan permisos por ejemplo, admin y customers, pero sellers no, 
o sellers y admin, pero customers no, para no hacer una funcion para cada situacion se hace una 
funcion dinamica  
 */
function checkRoles(...roles){
    roles.push('admin');
    return (req, res, next) => {
        const user = req.user;
        if(roles.includes(user.role)){
        next()
        } else {
        next(boom.unauthorized());
        }
    }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }