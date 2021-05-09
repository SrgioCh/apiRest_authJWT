const userRute = require('./v1/rutes_users');
const productRute = require('./v1/rutes_products');

const rutas = (app) => {
  app.use('/api/v1/users', userRute);
  app.use('/api/v1/products', productRute);
};
module.exports = rutas;