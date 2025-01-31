import express from 'express';
import { getVehicles, crearVehicle, actualizarVehicle, eliminarVehicle } from '../controller/vehicleController.js'
import { authenticateJWT } from '../middleware/authMiddleware.js'; // Importamos el middleware de autenticación

const vehi = express.Router();

// Solo los usuarios autenticados pueden ver y gestionar vehículos
vehi.get('/', authenticateJWT, getVehicles); // Obtener los vehículos del usuario autenticado
vehi.post('/', authenticateJWT, crearVehicle); // Crear un vehículo (vinculado al usuario autenticado)
vehi.put('/:id', authenticateJWT, actualizarVehicle); // Actualizar un vehículo
vehi.delete('/:id', authenticateJWT, eliminarVehicle); // Eliminar un vehículo

export default vehi;
