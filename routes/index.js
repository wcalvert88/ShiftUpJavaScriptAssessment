const express = require('express');
const router = express.Router();
const Students = require('../controllers/students.js');
// const mysql = require('mysql');
const Db = require('../controllers/db');
const url = require('url');

router.get('/', function(req, res) {
    res.render('index', {titlePage: "Shift_Up Simulator", title: "Welcome to Shift_Up the Simulator"});
});

router.route('/student/add')
    .get(function(req,res) {
    res.render('addStudent', {titlePage: "Add Student", title: "Add Student"});
        })
    .post(function(req, res) {
        student = new Students(req.body.sname, req.body.sAge, req.body.cAbility, req.body.cMoney);
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
        console.log("is this getting hit");
        console.log("Name:" + name);

        Db.findStudent(req.params.name, (err, results) => {
            if(err) throw err;
            if (results[0].ability > 100) {
                res.render('graduate', {titlePage: "All Graduates", title: "The student you are looking for has already graduated!", results: results})
            } else {
                res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: "Welcome to training young Padawan"});
            }
        });
    }).post(function(req,res) {
        console.log(req.params);
        let name = Db.cleanString(req.params.name);
        let finalScore = Students.train();
        console.log("FinalScore" + finalScore);
        Students.updateTraining(finalScore[0], name);
        if (Students.checkAbility(name)) {
            res.render('graduated', {titlePage: name + " Has Graduated!", title: name + " Has Graduated! Congratulations!", results: results})
        };
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: finalScore[1]});
        });
    })
    .put(function(req, res) {
        console.log(req.params);
        let name = Db.cleanString(req.params.name);
        Students.work(name);
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: "Gained $150 from working a few hours"})
        });
    });

router.route('/api/money/:name')
    .put(function(req, res) {
        let name = Db.cleanString(req.params.name);
        Students.work(name);
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            results = JSON.stringify(results);
            console.log("Put money ",results);
            res.render('api/money', {results: results});
        })
    }).get(function(req, res) {
        let name = Db.cleanString(req.params.name);
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            results = JSON.stringify(results);
            res.render('api/money', {results: results});
        })
    });

router.route('/api/addStudent/:name')
    .post(function(req, res) {
        console.log("req.param", req.body.name);
        let name = Db.cleanString(req.body.name);

        console.log("addStudent api name", name);
        console.log("api/addstudent money", req.body.money);
        console.log("api/addstudent age", req.body.age);
        console.log("api/addstudent ability", req.body.ability);
        student = new Students(req.body.name, req.body.age, req.body.ability, req.body.money);
        student.addStudent();
        console.log("api/addStudent findStudent name", name );
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            results = JSON.stringify(results);
            console.log("Added student ", results);
            res.render('api/addStudent', {results: results});
        })
    })
    .get(function(req, res) {
        let name = req.params.name;
        console.log("api/addStudent name get", name);
        name = Db.cleanString(name);
        
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            results = JSON.stringify(results);
            console.log("Added student ", results);
            res.render('api/addStudent', {results: results});
        })
    });
module.exports = router;