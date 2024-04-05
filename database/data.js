const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'e7852',
    database: 'teste'
})

connection.connect((err) => {
    if (err) {
        console.error('erro ao conectar ao mysql ' + err.message);
    } else {
        console.log('conectado');
    }
});

module.exports = connection;