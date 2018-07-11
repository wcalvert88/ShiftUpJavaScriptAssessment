class Student {
    constructor(name, age, ability, isStudent, money) {
        this.name = name;
        this.age = age;
        this.ability = ability;
        this.isStudent = isStudent;
        this.money = money;
    }

    get qualify() {
        return this.ability > 20 ? true : false;
    }

    get status() {
        return this.isStudent;
    }

    set applied() {
        if ((this.money > 150) && (this.qualify())) {
            return true;
        }
    }


}

module.export.allStudents = function(req,res) {
    //EVENTUALLY Get all students from database
    res.send("All Students");
}

module.exports.addStudent = function(req, res) {
    res.send("New Student");
}

module.exports.graduate = function(req,res) {
    res.send("Graduated");
}