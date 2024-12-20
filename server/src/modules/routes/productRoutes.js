import express from 'express';
import dbController from '../crudController.js';


const table = 'productos';
const router = express.Router();

router.get('/', all);
router.get('/:id', one);
router.put('/', deleteP);
router.post('/', create);

async function all(req, res) {
    try {
        const products = await dbController.all(table);
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function one(req, res) {
    try {
        const product = await dbController.one(table, req.params.id);
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function deleteP(req, res) {
    try {
        const affectedRows = await dbController.deleteP(table, req.body);
        if (affectedRows > 0) {
            res.json({ success: true, message: 'Producto eliminado.' });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function create(req, res) {
    try {
        if (req.body && req.body.id === 0) {
            const result = await dbController.create(table, req.body);
            res.status(201).json({ success: true, data: result });
        } else {
            const exists = await dbController.exists(table, req.body.id);
            if (exists) {
                const result = await dbController.create(table, req.body);
                res.json({ success: true, data: result });
            } else {
                res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export default router;