// backend/src/models/item.js
import mongoose from 'mongoose';

// Definimos el esquema de un vehículo
const vehicleSchema = new mongoose.Schema({
  placa: { type: String, required: true }, // Placa del vehículo, requerido
  claseVehicle: { type: String, required: true, enum: ['moto', 'automovil'] }, // Clase del vehículo, requerida
  marca: { type: String, required: true }, // Marca del vehículo, requerida
  linea: { type: String, required: true }, // Línea del vehículo, requerida
  modelo: { type: String, required: true }, // Modelo del vehículo, requerido
  cilindraje: { type: Number, required: true, maxlength: 4 }, // Cilindraje del vehículo, requerido
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true } // Relación con el usuario, tipo ObjectId y referencia a la colección de usuarios
}, { timestamps: true }); // La propiedad 'timestamps' agrega automáticamente 'createdAt' y 'updatedAt'

// Creamos el modelo de 'Vehicles' basado en el esquema
const Vehicle = mongoose.model('Vehicles', vehicleSchema);

export default Vehicle;