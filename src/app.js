import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { ConectarDB } from './config/database.js';
//import  router  from './routes/itemesroute.js';
import adminRoutes from './routes/adminRoutes.js'; // Aquí importas las rutas de admin
import path from 'path';
import { fileURLToPath } from 'url';
import vehi from './routes/vehicleRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
ConectarDB();

// Rutas
app.use('/api/auth', authRoutes);
//app.use('/api/items', router); // Si `router` no está definido, esto podría causar problemas.
app.use('/api/vehicles', vehi);

// Rutas de administración (solo admin puede acceder a estas)
app.use('/api/admin', adminRoutes);  

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));