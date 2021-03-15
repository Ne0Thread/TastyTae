const mysql = require('mysql');
const { promisify }=require('util');
const { database } = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexion se ha cerrado Xp jaja');
        }
        if(err.code=== 'ER_CON_COUNT_ERROR'){
            console.error('Muchas Conexiones en el servidor Xp jaja');
        }
        if(err.code ==='ECONNREFUSED'){
            console.error('Conexion rechazada Xp jaja');
        }
    }
    if(connection) connection.release();
    console.log('Base de datos Conextada :D');
    return;
} );
//promisify pool query, permite el uso de promesas que la coneccion no soporta a consultas
pool.query = promisify(pool.query);
module.exports = pool;