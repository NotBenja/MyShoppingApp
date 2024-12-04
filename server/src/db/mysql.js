import mysql from 'mysql2/promise';
import { config } from '../config.js';
import moment from 'moment';

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

async function connMySql() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL');
    } catch (err) {
        console.log('Error connecting to MySQL:', err);
        setTimeout(connMySql, 200);
    }
}

connMySql();

async function all(table) {
    try {
        const [rows] = await connection.query(`SELECT * FROM ${table}`);
        return rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

async function one(table, id) {
    try {
        const [rows] = await connection.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        return rows[0];
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

async function deleteP(table, { id }) {
    try {
        const [result] = await connection.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return result.affectedRows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

async function exists(table, id) {
    try {
        const [rows] = await connection.query(`SELECT 1 FROM ${table} WHERE id = ? LIMIT 1`, [id]);
        return rows.length > 0;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

async function insert(table, data) {
    try {
        if (data.fecha_creacion) {
            data.fecha_creacion = moment(data.fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
        }
        const [result] = await connection.query(`INSERT INTO ${table} SET ?`, [data]);
        return result.insertId;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

async function update(table, data) {
    try {
        if (data.fecha_creacion) {
            data.fecha_creacion = moment(data.fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
        }
        const [result] = await connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id]);
        return result.affectedRows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

async function create(table, data) {
    if (data && data.id === 0) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

export default { all, one, create, deleteP, exists };
