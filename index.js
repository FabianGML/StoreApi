const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000/', 'https://git.heroku.com/my-store-example-api.git']; //Solamente estos dominios tendran acceso a la api
// const options = {
//     origin: (origin, callback) => {
//         if (whitelist.includes(origin)){
//             callback(null, true);
//         } else {
//             callback (new Error('No Permitido'));
//         }
//     }
// }
//app.use(cors(options));//Con la configuracion app.use(cors()) se le permite a cualquier aplicacion front-end conectarse a la api

app.get('/', (req, res) => {
    res.send('Express App');
})

routerApi(app)

// Los errores se ejecutaran en el orden que se pongan
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server listening in port ${port}...`);
})