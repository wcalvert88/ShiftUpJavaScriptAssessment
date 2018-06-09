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