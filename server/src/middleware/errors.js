function error (message, code) {
    let err = new Error(message);
    if (code) err.statusCode = code; 
    throw err;
}

export default error;