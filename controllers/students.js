const db = require('../controllers/db');
const Db = new db();
const connection = Db.connection;
const mysql = require('mysql');
class Student {
    constructor(name, age, ability, money) {
        this.name = name;
        this.age = age;
        this.ability = ability;
        this.money = money;
        this.isStudent = this.applied(this.money);
        this.graduate = this.graduate(this.ability);
    };

    toJSON() {
        return {name: this.name, age: this.age, ability: this.ability, money: this.money, isStudent: this.isStudent, graduate: this.graduate};
    };

    addStudent() {
        if (!Db.testConnection()) {
            console.log("Creating Table"); 
            Db.createTable();
        }
        console.log("Anything happening");
        var sql = mysql.format("INSERT INTO shiftup (name, age, ability, money, isStudent, graduate) VALUES (?, ?, ?, ?, ?, ?);",[mysql.escape(this.name), mysql.escape(this.age), mysql.escape(this.ability), mysql.escape(this.money), mysql.escape(this.isStudent), mysql.escape(this.graduate)]);
        // connection.connect();
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(this.name + " added to the database");
        });
    };

    getStudents() {
        var sql = ("SELECT * FROM shiftup WHERE graduate = 0;");
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Here are all the students");
        });
        connection.end();
    };

    static updateStudents(train, name) {
        var sql = mysql.format("UPDATE shiftup SET ability = ability + ? WHERE name = ?;"[train, name]);
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(this.name + " updated");
        });
    }

    get qualify() {
        return this.ability >= 20 ? true : false;
    };

    get status() {
        return this.isStudent;
    };

    applied(money) {
        if ((this.money >= 150) && (this.qualify)) {
            this.isStudent = 1;
            return 1;
        } else {
            return 0;
        }
    };

    graduate(ability) {
        this.graduate = this.ability >= 100 ? 1 : 0;
        return this.graduate;
    };
}

module.exports = Student;
// module.export.allStudents = function(req,res) {
//     //EVENTUALLY Get all students from database
//     res.send("All Students");
// }

module.exports.addStudent = function(req, res) {
    res.send("New Student");
}

module.exports.graduate = function(req,res) {
    res.send("Graduated");
}

module.exports.find = function(req,res) {
    res.send("Find Student");
}