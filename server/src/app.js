import express from 'express';
import { config } from './config.js';
import products from './modules/products/routes.js';

const app = express();


//Configuracion del puerto
app.set('port', config.app.port);


//Rutas
app.use('/api/products', products)


export default app;