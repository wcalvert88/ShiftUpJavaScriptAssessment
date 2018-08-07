// This imports the mysql module for NodeJS
const mysql = require('mysql');

// This is the database class that sets up the connection to the database I know it's safer to use a config file for the password but since this is only used for an assessment and it's all defaults just figured I'd make it easy on the coaches.
class Db {
	// This automatically creates the connection as soon as the database object is created.
    constructor () { 
        this.connection = mysql.createConnection({
        host: 'a5s42n4idx9husyc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'nug9fqd98rcwmlr2',
        password: 'k6tdcf6wj2ohsu8q',
        database: 'nhnj5kh1d2wkipch'
        });
    };

	// This is just to test the connection and to see if the database exists.
    testConnection(cb) {
        console.log("Testing");
        this.connection.connect();
        let sql = "SELECT 1 FROM shiftup LIMIT 1";
        this.connection.query(sql, cb);
    };

	// This method is to create the table and should only be run if the database does not exist.
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

	// This method searches for all students that have not graduated and has a built-in callback function that will return the data to whatever calls this function.
    findStudents(cb) {
        // If graduate = 0 they have to be a student, and if they aren't a student either they are really messed up and should join.
        let sql = "SELECT * FROM shiftup WHERE graduate = 0;";
        this.connection.query(sql, cb);
    };

    findStudent(name, cb) {
        name = this.cleanString(name);
        console.log("findStudent name " + name);
        let sql = mysql.format("SELECT * FROM shiftup WHERE name = ? LIMIT 1;",[name]);
        this.connection.query(sql, cb);
    }

	//  This method searches for all graduates and returns the data back to whatever called this method.
    findGraduates(cb) {
        let sql = "SELECT * FROM shiftup WHERE graduate = 1;";
        this.connection.query(sql, cb);
    }

	// This method cleans the string automatically to prevent SQL injection and so I didn't have to type these functions manually several times.
    cleanString(badData) {
        return mysql.escape((badData).split("-").join(" ")).slice(1,-1);
    }
}

// This exports a new Db object so I will not need to create one on importing because you really only want 1 database connection.
module.exports = new Db();
