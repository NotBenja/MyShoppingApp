import express from 'express';
import { success, error } from '../../utils/responseHandler.js';


const router = express.Router();

router.get('/', (req, res) => {
    success(req, res, 'OK', 200);
});

export default router;