const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers; // const token=req.headers.token
    if (token) {
      const dataToken = jwt.verify(token, process.env.JWT_SECRET);
      req.sesionDataToken = { userID: dataToken.userId, role: dataToken.role };
      next();
    } else {
      res.status(403).json({
        status: 'ACCESS_DENIED',
        message: 'Debes enviar el token en el header',
      });
    }
  } catch (e) {
    res.status(e.code || 500) 
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.sesionDataToken; 

    if (role !== 'admin') {
      res.status(403).json({
        status: 'ACCESS_DENIED',
        message: 'No puedes eliminar a nadie ,no eres admin',
      });
    }
    next();
  } catch (e) {
    res
      .status(e.code || 500) // si no existe e.code que use 500
      .json({ status: e.status || 'ERROR', message: e.message });
  }
};

module.exports = { isAuth, isAdmin };
