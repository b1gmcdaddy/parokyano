const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'host',
    password: '',
    database: 'parokyano'
})

module.exports = pool