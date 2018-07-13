const express = require('express');
const router = express.Router();
const students = require('../controllers/students.js');

router.get('/', function(req, res) {
    res.render('index', {titlePage: "Shift_Up Simulator", title: "Welcome to Shift_Up the Simulator"});
});

// router.get('/student', students.allStudents);

router.get('/student/add', function(req,res) {
    res.render('addStudent', {titlePage: "Add Student", title: "Add Student"});
});

router.get('/student/find', function(req, res) {
    res.render('findStudent', {titlePage: "Find Student", title: "Search for Students"});
});
router.get('/student/graduate', function(req,res) {
    res.render('graduate', {titlePage: "Graduated Students", title:"View All Graduates and Apply for Graduation"});
});

module.exports = router;