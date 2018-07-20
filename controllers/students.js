const Db = require('../controllers/db');

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
        this.results = "";
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
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(this.name + " added to the database");
        });
    };

    static getStudents() {
        var sql = ("SELECT * FROM shiftup WHERE isStudent = 1;");
        var results = connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Here are all the students");
            // console.log(result);
            Student.results = result;
        });
        return this.results;
    };

    static updateTraining(train, name) {
        name = Db.cleanString(name);
        let sql = mysql.format("UPDATE shiftup SET ability = ability + ? WHERE name = ?;",[train, name]);
        Student.checkAbility(name);
        console.log("updateStudents sql " + sql);
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

   static updateGraduate(name) {
        if(Student.applyGraduate()) {
            name = Db.cleanString(name);
            let sql = mysql.format("UPDATE shiftup SET graduate = 1 WHERE name = ?;");
            connection.query(sql, function(err, result) {
                if (err) throw err;
                console.log(this.name + " graduated");
            });
        } else {
            console.log("You won't be able to graduate with that ability");
        }
        
    }
    
    static applyGraduate() {
        this.graduate = this.ability >= 100 ? 1 : 0;
        return this.graduate;
    };

    static train() {
        let randNum = Math.ceil(Math.random() * 5);
    let training = 0;
    let trainingMessage = "";
    switch (randNum) {
        case 1:
            training = 1;
            trainingMessage = "You had a nice steady learning experience";
            break;
        case 2:
            training = -1;
            trainingMessage = "You were distracted most of the day and had to refresh what you already know";
            break;
        case 3:
            training = 2;
            trainingMessage = "You had a great day you learned more than what you set out to accomplish";
            break;
        case 4:
            training = -2;
            trainingMessage = "You had a terrible day and just couldn't figure anything out and started questioning what you already know";
            break;
        case 5:
            training = 5;
            trainingMessage = "You had an amazing day! You feel that you might just be a natural programmer";
            break;
        default:
            training = 0;
            trainingMessage = "I don't think it's possible for the code to get here but just in case Good Job you found a bug!"
            break;
    }

    let multiplyerNum = Math.random();
    let multiplyer = 1;
    if (multiplyerNum < 0.3) {
        multiplyer = 1;
    } else if (multiplyerNum < 0.5) {
        multiplyer = 1.5;
    } else if (multiplyerNum < 0.7) {
        multiplyer = 2;
    } else if (multiplyerNum < .9) {
        multiplyer = 2.5;
    } else {
        multiplyer = 3;  // Yes intentional 1/10th chance for 3x multiplyer
        trainingMessage += "Congrats you got a 3x multiplyer too! Super smart looking!"
    }
    let finalScore = 0;
    if (training < 1) {
        finalScore = training;
    } else {
        finalScore = training * multiplyer;
    }

    return [finalScore, trainingMessage];

    }

    static checkAbility(name) {
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            console.log("results " + results);
            console.log("results[name] " + results[0].name);
            Student.updateGraduate(results[0].name);
        });
    }
}

module.exports = Student;
