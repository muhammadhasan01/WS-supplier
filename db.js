const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'wwsupplier'
})

connection.connect(function(e) {
    if (e) {
      console.log(e)
      throw e
    }
})

exports.connection = connection;