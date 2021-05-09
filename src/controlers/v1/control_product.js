const Products = require('../../moongo/modelos/model_productos');

// el producto sera tendra un dueño , que es el usuario autenticado
const createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const producto = await Products.create({
      name,
      description,
      price,
      image,
      user: req.sesionDataToken.userID,
    });
    res.json({ status: 'OK', data: producto });
  } catch (error) { 
    console.log(error);
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find()
      .populate('user', 'name email data')
      .select('name description price');

    res.json({ status: 'OK', data: products });
  } catch (e) {
    res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.ideUsuario,
    });

    res.json({ status: 'OK', data: products });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await Products.deleteOne({ _id: id });
    if (eliminado.deletedCount > 0) {
      res.json({ status: 'OK', message: 'Producto eliminado' });
    } else {
      res
        .status(500)
        .send({ status: 'ERROR', message: 'Ese usuario no existe en la BD' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsByUser,
  deleteProduct,
};
