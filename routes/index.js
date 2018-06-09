const express = require('express');
const router = express.Router();
const students = require('../controllers/students.js');

router.get('/', function(req, res) {
    res.render('index.ejs');
});

router.get('/student', students.allStudents);

router.get('/student/add', students.addStudent);

router.get('/student/graduate', students.graduate);