const express = require('express');

const router = express.Router();

const { isAuth } = require('../../middlewars/autentifica');
const productoControler = require('../../controlers/v1/control_product');

router.post('/create', isAuth, productoControler.createProduct);
router.get('/get_all', productoControler.getProducts);
router.get('/get_by_user/:ideUsuario', productoControler.getProductsByUser);
router.delete('/delete/:id', isAuth, productoControler.deleteProduct);

module.exports = router;
