const mysql = require('mysql');

class Db {
    constructor (connection, results) { 
        this.connection = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "root",
            database: "shiftup"
        });
        this.results = 0;
    };

    testConnection() {
        console.log("Testing");
        this.connection.connect();
        let sql = "SELECT 1 FROM shiftup LIMIT 1";
        this.connection.query(sql, function(err, result) {
            if (err) return false;
            console.log("Test worked" + result);
            return true;
        })
    };

    createTable() {
        // this.connection.connect();
        let sql = "CREATE TABLE shiftup ( ";
        sql += "id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY, ";
        sql += "name VARCHAR(60) NOT NULL, ";
        sql += "age INT(3) UNSIGNED NOT NULL, ";
        sql += "ability INT(3) UNSIGNED NOT NULL, ";
        sql += "money INT(3) SIGNED NOT NULL, ";
        sql += "isStudent INT(1) NOT NULL, ";
        sql += "graduate INT(1) NOT NULL);";
        this.connection.query(sql, function(err, result) {
            console.log("Running");
            if (err) return err;
            console.log("Table Created");
            return true;
        });
    };

    findStudents() {
        let sql = "SELECT * FROM shiftup;";
        this.results = this.connection.query(sql, function(err, results) {
            if (err) {
                return err;
            }
            return results;
        });
        console.log(this.results);
        return this.results;
    };
}
// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   }
// );

// connection.end();

module.exports = Db;