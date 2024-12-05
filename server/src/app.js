import express from 'express';
import cors from 'cors'; 
import { config } from './config.js';
import morgan from 'morgan';
import error from './middleware/errors.js';
import productsRoutes from './modules/routes/productRoutes.js';
import inventoryRoutes from './modules/routes/inventoryRoutes.js';
import salesRoutes from './modules/routes/salesRoutes.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion del puerto
app.set('port', config.app.port);

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use(error);

export default app;