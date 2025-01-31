// backend/src/models/item.js
import mongoose from 'mongoose';

// Definimos el esquema de un item
const soatSchema = new mongoose.Schema({
    numPoliza: { type: String, required: true }, // Nombre del item, requerido
    fechaIniVig: { type: date, required: true}, // Descripción del item, requerida
    fechaFinVig:{type:Date, required: true},
    entidadExpSOAT:{type:String, required: true},
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles', required: true }, // Relación con el usuario el type es un ObjectId y ref es la referencia a la colección de usuarios
}, { timestamps: true }); // La propiedad 'timestamps' agrega automáticamente 'createdAt' y 'updatedAt'

// Creamos el modelo de 'Item' basado en el esquema
const soat = mongoose.model('soats', soatSchemaSchema);

export default soat;