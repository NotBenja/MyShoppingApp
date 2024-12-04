export function success (req, res, message, status) {
    const statusCode = status || 200;
    const okMessage = message || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: okMessage
    });
}

export function error (req, res, message, status) {
    const statusCode = status || 200;
    const errorMessage = message || 'Internal Error';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: errorMessage
    });
}