import db from '../db/mysql.js';

const table = 'productos';

function all(){
    return db.all(table);
}

function one(id){
    return db.one(table, id);
}

function deleteP(body){
    return db.deleteP(table, body);
}

function create(body){
    return db.create(table, body);
}

function exists(id){
    return db.exists(table, id);
}


export default { all, one, deleteP, create, exists };