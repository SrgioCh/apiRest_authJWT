const mongoose = require('mongoose');

const { Schema } = mongoose; // Schema = mongoose.Schema

const producSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
// creamos el modelo :
const productoModelo = mongoose.model('Producto', producSchema);

module.exports = productoModelo;
