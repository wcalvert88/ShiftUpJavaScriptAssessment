const express = require('express');
const router = express.Router();
const students = require('../controllers/students.js');

const db = require('../controllers/db');
const Db = new db();
router.get('/', function(req, res) {
    res.render('index', {titlePage: "Shift_Up Simulator", title: "Welcome to Shift_Up the Simulator"});
});

// router.get('/student', students.allStudents);

router.get('/student/add', function(req,res) {
    res.render('addStudent', {titlePage: "Add Student", title: "Add Student"});
});

router.post('/student/add', function(req, res) {
    student = new students(req.body.sname, req.body.sAge, req.body.cAbility, req.body.cMoney);
    student.addStudent();
    res.render('addStudent', {titlePage: "Added Student", title: "Added Student " + req.body.sname });
});

router.get('/student/find', function(req, res) {
    let sql = "SELECT * FROM shiftup WHERE isStudent = 1;";
    Db.connection.query(sql, function(err, results) {
        if (err) {
            return err;
        }
        console.log(results);
        res.render('findStudent', {titlePage: "Find Student", title: "Search for Students", results: results});
    });
});

router.get('/student/graduate', function(req,res) {
    res.render('graduate', {titlePage: "Graduated Students", title:"View All Graduates and Apply for Graduation"});
});



router.get('/student/study/', function(req, res) {
    res.render('study', {titlePage: req.body.sname + "'s Training", title: req.body.sname + "'s Training"});
});
module.exports = router;