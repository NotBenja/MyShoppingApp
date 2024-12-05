import express from 'express';
import crudController from '../crudController.js';

const router = express.Router();
const table = 'inventario';

router.get('/', all);
router.get('/:id', one);
router.put('/', deleteP);
router.post('/', create);

async function all(req, res) {
    try {
        const inventory = await crudController.all(table);
        res.json({ success: true, data: inventory });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function one(req, res) {
    try {
        const item = await crudController.one(table, req.params.id);
        res.json({ success: true, data: item });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function deleteP(req, res) {
    try {
        const affectedRows = await crudController.deleteP(table, req.body);
        if (affectedRows > 0) {
            res.json({ success: true, message: 'Item eliminado.' });
        } else {
            res.status(404).json({ success: false, message: 'Item no encontrado.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

async function create(req, res) {
    try {
        if (req.body && req.body.id === 0) {
            const result = await crudController.create(table, req.body);
            res.status(201).json({ success: true, data: result });
        } else {
            const exists = await crudController.exists(table, req.body.id);
            if (exists) {
                const result = await crudController.create(table, req.body);
                res.json({ success: true, data: result });
            } else {
                res.status(404).json({ success: false, message: 'Item no encontrado' });
            }
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export default router;