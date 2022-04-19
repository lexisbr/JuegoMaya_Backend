const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5200fcb1LEXIS.',
    port: 3306, 
    database: 'juego_maya'
});

connection.connect((err) => {
    if(err){
        console.log("ERROR: ",err);
    }else{
        console.log("Database is connected!")
    }
});

module.exports = connection;