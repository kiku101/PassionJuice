const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./products');

function route(app) {

    app.use('/',siteRouter);

    app.use('/user',userRouter);

    app.use('/products',productRouter);

}

module.exports = route;