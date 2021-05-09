const mongoose = require('mongoose');

const { Schema } = mongoose; // Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  data: {
    type: { age: Number, isMale: Boolean },
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' },
});
// creamos el modelo :
const userModelo = mongoose.model('Usuario', userSchema);

module.exports = userModelo;
