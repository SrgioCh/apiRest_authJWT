const express = require('express');
const bodyParser = require('body-parser');

const rutas = require('./routes/enrutador');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));// para detectar datos desde el formulario
app.use(bodyParser.json());// para que detecte los datos entrantes Json

rutas(app);

module.exports = app;
