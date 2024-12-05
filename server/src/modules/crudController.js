import db from '../db/mysql.js';

function all(table) {
    return db.all(table);
}

function one(table, id) {
    return db.one(table, id);
}

function deleteP(table, body) {
    return db.deleteP(table, body);
}

function create(table, body) {
    return db.create(table, body);
}

function exists(table, id) {
    return db.exists(table, id);
}

export default { all, one, deleteP, create, exists };