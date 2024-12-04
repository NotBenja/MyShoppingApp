import express from 'express';
import { success, error } from '../../utils/responseHandler.js';
import dbController from '../dbController.js';

const router = express.Router();

router.get('/', all);
router.get('/:id', one);
router.put('/', deleteP);
router.post('/', create);

async function all(req, res) {
    try {
        const products = await dbController.all();
        success(req, res, products, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
}

async function one(req, res) {
    try {
        const product = await dbController.one(req.params.id);
        success(req, res, product, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
}

async function deleteP(req, res) {
    try {
        const affectedRows = await dbController.deleteP(req.body);
        if (affectedRows > 0) {
            success(req, res, 'Producto eliminado.', 200);
        } else {
            error(req, res, 'Producto no encontrado.', 404);
        }
    } catch (err) {
        error(req, res, err.message, 500);
    }
}

async function create(req, res) {
    try {
        if (req.body && req.body.id === 0) {
            const result = await dbController.create(req.body);
            success(req, res, result, 201);
        } else {
            const exists = await dbController.exists(req.body.id);
            if (exists) {
                const result = await dbController.create(req.body);
                success(req, res, result, 200);
            } else {
                error(req, res, 'Producto no encontrado', 404);
            }
        }
    } catch (err) {
        error(req, res, err.message, 500);
    }
}

export default router;