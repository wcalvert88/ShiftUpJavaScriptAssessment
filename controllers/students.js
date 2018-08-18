// This imports the database to be used in the Student class.
const Db = require('../controllers/db');
// This imports the connection from the database so I don't have to type the Db before it every time.
const connection = Db.connection;
// This imports the mysql module to be able to write to the database.
const mysql = require('mysql');

// This is the Student class that is the main backbone of the program.
class Student {
    // This is the constructor that takes name, age, ability, money for the class and from this creates the other properties needed for uploading to the database.
    constructor(name, age, ability, money) {
        this.name = name;
        this.age = age;
        this.ability = ability;
        this.money = money;
        this.isStudent = this.applied(this.money);
        this.graduate = Student.applyGraduate(this.ability);
        this.classCountdown = 10;
        this.results = "";
    };

	// This returns the class object as JSON
    toJSON() {
        return {name: this.name, age: this.age, ability: this.ability, money: this.money, isStudent: this.isStudent, graduate: this.graduate};
    };

	// This adds the student to the database
    addStudent() {
        // This checks to make sure the shiftup table has already been created.  If there is an err it assumes there is no table created so it will try and create one.  If create table runs into an error then it will error out.  With testConnection it either means there is no table shiftup or there the server isn't turned on.
        Db.testConnection((err, result) => {
            if (err) throw Db.createTable();
        });
        
        // The name format is sent to this method like this: Wade-Calvert
        this.name = (this.name.split("-")).join(" ");
        // Escape the string to help prevent SQL injection
        this.name = mysql.escape(this.name);
        // Escaping the string makes this.name like this: 'Wade Calvert' so this removes the single-quotes.
        this.name = this.name.slice(1, -1);
        console.log("student stats", this.name, this.age, this.ability, this.money, this.isStudent, this.graduate);
    
        var sql = mysql.format("INSERT INTO shiftup (name, age, ability, money, isStudent, graduate, classCountdown) VALUES (?, ?, ?, ?, ?, ?, ?);",[this.name, this.age, this.ability, this.money,this.isStudent, this.graduate, this.classCountdown]);
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(this.name + " added to the database");
        });
    }

	// This updates the selected student's ability and runs a charge method for billing purposes.
	static updateTraining(train, name) {
        name = Db.cleanString(name);
        let sql = mysql.format("UPDATE shiftup SET ability = ability + ? WHERE name = ?;",[train, name]);

        // Function used as parameter just put it in a variable "name" to use in more places.
        
        Student.charge(name);
        console.log("updateStudents sql " + sql);
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(this.name + " updated");
        });
    };

	// This charges the student for using shiftup services.
    static charge(name) {
		// This finds the student to be charged
        Db.findStudent(name, (err, result) => {
            if (err) throw err;
            console.log("countdown", result[0].classCountdown);
			
			// This checks to see if there are available classes left.  For speed of simulation purposes I've preset classCountdown to be 10 classes per billing period even though in real life it's ~16.

			// Anyway if classCountdown is below 0 and money is less than the monthly fee stop from learning and go work. if classCountdown is below 0 and there is enough money then deduct $150 and reset countdown to 10.
            if (result[0].classCountdown <= 0) {
                if (result[0].money < 150) {
                    return "You need to earn more money";
                } else {
                    let sql = mysql.format("UPDATE shiftup SET classCountdown = 10, money = money - 150 WHERE name = ?;",[name]);
                    connection.query(sql, function(err, result) {
                        if (err) throw err;
                        console.log("final countdown complete");
                    })
                }
			
			// if classCountdown is greater than 10 just remove 1 from classCountdown.
            } else {
                let sql = mysql.format("UPDATE shiftup SET classCountdown = classCountdown - 1 WHERE name = ?;",[name]);
                connection.query(sql, function(err, result) {
                    if (err) throw err;
                    console.log("charged successfully");
                })
            }
        })
    }

	// This checks to make sure the student qualifies for shiftup if ability is below 20 they don't qualify
    get qualify() {
        return this.ability >= 20 ? true : false;
    };

	// This sees if the student has enough money and ability to become a student of shiftup
    applied(money) {
        if ((this.money >= 150) && (this.qualify)) {
            this.isStudent = 1;
            return 1;
        } else {
            return 0;
        }
    };

	// This is used to check if the student is ready to graduate.  Just used for setting up the student
    static applyGraduate() {
        console.log("applyGraduate this.ability", this.ability);
        return this.ability >= 100 ? true : false;
    };


	// This is where the student learns and most of the game logic is done.
    static train() {
		// Get random number from 1-5		
        let randNum = Math.ceil(Math.random() * 5);
        let training = 0;
        let trainingMessage = "";
		
		// Made it so that if the random number is odd you get an ability point and a message for how you did that session.  If the number is even you lose an ability point with a message explaining why.
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
                trainingMessage = "You had a terrible day and just couldn't figure anything out and started questioning what you already know.";
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

		// I got bored with the simulator myself so I added this part in for a multiplier to your positive training.  If you had a bad training session you penalty will not be multiplied.
        let finalScore = 0;
        if (training < 1) {
            finalScore = training;
        } else {
            let multiplierNum = Math.random();
            let multiplier = 1;
            if (multiplierNum < 0.3) {
                multiplier = 1;
            } else if (multiplierNum < 0.5) {
                multiplier = 1.5;
            } else if (multiplierNum < 0.7) {
                multiplier = 2;
            } else if (multiplierNum < .9) {
                multiplier = 2.5;
            } else {
                multiplier = 3;  // Yes intentional 1/10th chance for 3x multiplier
                trainingMessage += " Congrats you got a 3x multiplier too! Super smart looking!"
            }


            finalScore = training * multiplier;
        }

        return [finalScore, trainingMessage];
    };

	// Find the student to update money field.
    static work(name) {
        console.log("working man running");
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            Student.updateMoney(results[0].name);
        })
    };

	// After the student is found update the students money field.
    static updateMoney(name) {
        let sql = mysql.format("UPDATE shiftup SET money = money + 150 WHERE name = ?;",[name]);
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log(this.name + " made $150");
        });
    }

    // This updates the graduate status for the student
    static updateGraduate(name) {
        Db.findStudent(name, (err, results) => {
            if(results[0].ability >= 100) {
                name = Db.cleanString(name);
                let sql = mysql.format("UPDATE shiftup SET graduate = 1 WHERE name = ?;",[name]);
                connection.query(sql, function(err, result) {
                    if (err) throw err;
                    console.log(this.name + " graduated");
                });
            } else {
                console.log("You won't be able to graduate with that ability");
            }
            
        })
    }
}
module.exports = Student;
