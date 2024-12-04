import e from 'express';
import response from './responseHandler.js';

function errors(err, req, res, next) {
    console.error('[error', err);
    const message = err.message || 'Internal error';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
}

export default errors;