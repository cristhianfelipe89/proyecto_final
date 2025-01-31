import express from 'express'; // Importamos Express
import Vehicle from '../models/vehicle.js'; // Importamos el modelo Vehicle

const vehi = express.Router();

// Obtener los vehículos del usuario autenticado
export const getVehicles = async (req, res) => {
    try {
        const userId = req.userId; // El ID del usuario viene del token JWT
        const vehicles = await Vehicle.find({ user: userId }); // Filtramos los vehículos por el usuario

        res.status(200).json(vehicles); // Respondemos con los vehículos encontrados
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

// Crear un nuevo vehículo, vinculado al usuario autenticado
export const crearVehicle = async (req, res) => {
    try {
        const { placa, claseVehicle, marca, linea, modelo, cilindraje } = req.body;
        const userId = req.userId; // El ID del usuario viene del token JWT

        // Creamos una nueva instancia del modelo Vehicle con los datos recibidos y el ID del usuario
        const newVehicle = new Vehicle({ placa, claseVehicle, marca, linea, modelo, cilindraje, user: userId });

        // Guardamos el nuevo vehículo en la base de datos
        await newVehicle.save();
        // Respondemos con el vehículo creado y código de estado 201 (Creado)
        res.status(201).json(newVehicle);
    } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un vehículo existente
export const actualizarVehicle = async (req, res) => {
    try {
        // Buscamos el vehículo por su ID y lo actualizamos con los nuevos datos
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Respondemos con el vehículo actualizado
        res.status(200).json(updatedVehicle);
    } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un vehículo
export const eliminarVehicle = async (req, res) => {
    try {
        // Buscamos el vehículo por su ID y lo eliminamos
        await Vehicle.findByIdAndDelete(req.params.id);
        // Respondemos con código 204 (sin contenido)
        res.status(204).json();
    } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

export default vehi; // Exportamos las rutas para usarlas en el archivo server.js
