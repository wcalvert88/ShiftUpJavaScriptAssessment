const mysql = require('mysql');

class Db {
    constructor () { 
        this.connection = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password: "root",
            database: "shiftup"
        });
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

    findStudents(cb) {
        let sql = "SELECT * FROM shiftup WHERE isStudent = 1;";
        this.connection.query(sql, cb);
    };

    findStudent(name, cb) {
        name = this.cleanString(name);
        console.log("findStudent name " + name);
        let sql = mysql.format("SELECT * FROM shiftup WHERE name = ? LIMIT 1;",[name]);
        this.connection.query(sql, cb);
    }

    findGraduates(cb) {
        let sql = "SELECT * FROM shiftup WHERE graduate = 1;";
        this.connection.query(sql, cb);
    }

    cleanString(badData) {
        return mysql.escape((badData).split("-").join(" ")).slice(1,-1);
    }
}

module.exports = new Db();