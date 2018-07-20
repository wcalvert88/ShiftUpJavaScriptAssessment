const express = require('express');
const router = express.Router();
const students = require('../controllers/students.js');
const mysql = require('mysql');
const Db = require('../controllers/db');

router.get('/', function(req, res) {
    res.render('index', {titlePage: "Shift_Up Simulator", title: "Welcome to Shift_Up the Simulator"});
});

router.get('/student/add', function(req,res) {
    res.render('addStudent', {titlePage: "Add Student", title: "Add Student"});
});

router.post('/student/add', function(req, res) {
    student = new students(req.body.sname, req.body.sAge, req.body.cAbility, req.body.cMoney);
    student.addStudent();
    res.render('addStudent', {titlePage: "Added Student", title: "Added Student " + req.body.sname });
});

router.get('/student/find', function(req, res) {
    Db.findStudents((err, results) => {
        if (err) throw err;
        console.log(results);
        res.render('findStudent', {titlePage: "Find Student", title: "Search for Students", results: results});
    });
});

router.get('/student/graduate', function(req,res) {

    Db.findGraduates((err, results) => {
        if (err) throw err;
        res.render('graduate', {titlePage: "Graduated Students", title:"View All Graduates", results: results});
    })
});

router.route('/study/:name')
    .get(function(req, res) {
        name = Db.cleanString(req.params.name);
        console.log("Name:" + name);

        Db.findStudent(req.params.name, (err, results) => {
            if(err) throw err;
            if (results[0].ability > 100) {
                res.render('graduate', {titlePage: "All Graduates", title: "The student you are looking for has already graduated!", results: results})
            } else {
                res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: "Welcome to training young Padawan"});
            }
        });
    }).put(function(req,res) {
        console.log(req.params);
        let name = Db.cleanString(req.params.name);
        let finalScore = students.train();
        console.log("FinalScore" + finalScore);
        students.updateTraining(finalScore[0], name);
        if (students.checkAbility(name)) {
            res.render('graduated', {titlePage: name + " Has Graduated!", title: name + " Has Graduated! Congratulations!", results: results})
        }
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: finalScore[1]});
        });
});

module.exports = router;