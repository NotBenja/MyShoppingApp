import express from 'express';
import { config } from './config.js';
import morgan  from 'morgan'
import error from './middleware/errors.js';
import products from './modules/products/routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion del puerto
app.set('port', config.app.port);


//Rutas
app.use('/api/products', products)
app.use(error);

export default app;