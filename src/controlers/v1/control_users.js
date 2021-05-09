const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../../moongo/modelos/model_users');
const Products = require('../../moongo/modelos/model_productos'); // para borrar user y sus productos vinculados

const expiresIn = 60 * 10; // jsontoken

/* ****************************************************************
                           AUTENTICACION
 **************************************************************** */
const loginToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      const ide = user._id;

      const isOk = await bcript.compare(password, user.password);
      if (isOk) {
        // si nos logeamos , generamos el token
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        // respuesta del endpoint :
        res.json({
          status: 'OK',
          jwt: {
            token,
            expiresIn,
            ide,
          },
          data: user,
        });
      } else {
        res.status(403).json({ status: 'ERROR', message: 'INVALID_PASSWORD' });
      }
    } else {
      res.status(401).json({
        status: 'ERROR',
        message: 'USER_NOT_FOUND',
      });
    }
  } catch (e) {
    res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

/* ****************************************************************
                              REST
 **************************************************************** */
const getUsers = async (req, res) => {
  try {
    // const usuarios = await Users.find();
    // const usuarios = await Users.find().select('name email data.age');
    const usuarios = await Users.find().select({
      password: 0,
      __v: 0,
    });
    res.json({ mesage: 'ok', data: usuarios });
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const datos = req.body;
    // A)encriptando password
    const has = await bcript.hash(datos.password, 15);
    datos.password = has;
    // B)creamos el usuario
    const user = new Users(datos);

    // C)lo guardamos en la BD
    await user.save();
    // D)Enviamos respuesta del endpoint
    const { password, updatedAt, __v, ...other } = user._doc;
    res.json({
      status: 'OK',
      message: 'Usuario Creado con exito',
      data: other,
    });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).json({
        status: 'El nombre de usuario o su email ya existe',
        message: error.keyValue,
      });
      return;
    }
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

const updateUserLog = async (req, res) => {
  // el id del user a modificar, viene en el token
  try {
    const userIDE = req.sesionDataToken.userID;
    const datosUpdate = req.body;// datos a modificar

    if (userIDE === undefined) {
      res.json({ status: 'ERROR', message: 'userID desconocido' });
      return;
    }

    const user = await Users.findByIdAndUpdate(userIDE, datosUpdate);
    res.json({ status: 'OK', message: 'user actualizado con exito', data: user });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .json({ status: 'ERROR', message: 'Valores duplicados' });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'no se pudo actualizar' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      throw new Error('No enviaste el userId');
    }
    if (await Users.findByIdAndDelete(userId)) {
      // *eliminamos todos los productos relacionados a ese usuario
      await Products.deleteMany({ user: userId });
    } else {
      throw new Error('user NO exist');
    }
    res.json({ status: 'OK', message: 'Usuario Eliminado con exito ' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: error.message });
  }
};

module.exports = {
  loginToken,
  createUser,
  getUsers,
  updateUserLog,
  deleteUser,
};
