const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Para usar variable de entorno
const app = require('./app');

/* *********           PARA USAR LA BASE DE DATOSSS           ******** */
dotenv.config(); // habilita lectura de variables entorno

const puerto = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Conectado a mongo DB');
    app.listen(puerto, () => {
      console.log(`running en port  :${puerto} `);
    });
  })
  .catch((error) => {
    console.log(`mongoDB fallo : ${error}`);
  });

// ********************************************************************
