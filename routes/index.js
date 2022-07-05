const express = require('express');

const productsRouter = require('./products.router');
const userRouter = require('./users.router');
const customerRouter = require('./customers.router');
const categoryRouter = require('./categories.router');
const orderRouter = require('./orders.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router)
    router.use('/products', productsRouter);
    router.use('/users', userRouter);
    router.use('/customers', customerRouter);
    router.use('/categories', categoryRouter);
    router.use('/orders', orderRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);
}



module.exports = routerApi;