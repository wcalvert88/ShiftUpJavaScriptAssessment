const express = require('express');
const router = express.Router();
const Students = require('../controllers/students.js');
const Db = require('../controllers/db');

// This sets the route for the home page as a GET request no other HTTP methods should be run on this page.

// This page has functions used as parameters all throughout

router.get('/', function(req, res) {
    res.render('index', {titlePage: "Shift_Up Simulator", title: "Welcome to Shift_Up the Simulator"});
});

// This is handles multiple HTTP methods for the route to /student/add
router.route('/student/add')
    // This sets the GET method to render the student/add page
    .get(function(req,res) {
        res.render('addStudent', {titlePage: "Add Student", title: "Add Student"});
        })
    // This sets the POST method for the student/add page.  It creates a new student so that the default properties are added to the object and adds it to the data base based on the inputs from the form.
    .post(function(req, res) {

        // Creating an object

        student = new Students(req.body.sname, req.body.sAge, req.body.cAbility, req.body.cMoney);
        student.addStudent();
        res.render('addStudent', {titlePage: "Added Student", title: "Added Student " + req.body.sname });
    });

// This sets the GET method for the student/find page.  It renders the page to show all students that are not graduated.
// Refer to Db.findStudents(cb) to see how that works.
router.get('/student/find', function(req, res) {
    Db.findStudents((err, results) => {
        if (err) throw err;
        console.log(results);
        res.render('findStudent', {titlePage: "Find Student", title: "Search for Students", results: results});
    });
});

// This sets the GET method for the student/graduate page. It is really similar to student/find except opposite really.
// Refer to Db.findGraduates(cb) to see how that works.
router.get('/student/graduate', function(req,res) {
    Db.findGraduates((err, results) => {
        if (err) throw err;
        console.log("graduate results", results);
        res.render('graduate', {titlePage: "Graduated Students", title:"View All Graduates", results: results});
    });
});

// This handles the available HTTP methods for the study/:name page.  The :name makes it dynamic so you can insert any name with hypens for spaces i.e. Wade-Calvert to go that students trainig page.
router.route('/study/:name')
    // This is the get method for study/:name.  As you will see I wrote a quick method to escape my SQL variables called Db.cleanString(badData).
    .get(function(req, res) {
        name = Db.cleanString(req.params.name);
        console.log("Study/:name:" + name);
        Students.updateGraduate(name);
        // This calls the Db.findStudent(name, cb) which just grabs a students info from the database and returns it here for checking which page should be rendered.
        
        // This uses a self-invoking callback function to return the results from Db.findStudent to this file. Asynchronicity


        Db.findStudent(req.params.name, (err, results) => {
            if(err) throw err;
	        // If the students ability is greater than 100 than display a page saying they have already graduated. If not then it will show the students training page. 
            if (results[0].ability >= 100) {
                res.render('graduate', {titlePage: "All Graduates", title: "The student you are looking for has already graduated!", results: results})
            } else {
                res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: "Welcome to training young Padawan"});
            }
        });
    // This is the post method for the study/:name page.  This is used for training the student.
    }).post(function(req,res) {
        console.log("Posting now training now");
        let name = Db.cleanString(req.params.name);
	// This is the main logic for the game it increases or decreases the ability attribute see Students.train() for more info.
        let finalScore = Students.train();
        console.log("FinalScore" + finalScore);
    // This updates the students ability
        Students.updateTraining(finalScore[0], name);

        Students.updateGraduate(name);
	// This is the logic that checks to see if the new ability qualifies the student for graduation or not this renders the congratulations page if the student has graduated.
        Db.findStudent(name, (err, results) => {
            if (err) throw err;

            console.log("Post results ability", results[0].ability);
            console.log("student results", JSON.stringify(results));
            if (results[0].ability >= 100) {
            // This updates the graduate field in the database if the student has graduated.
                
                res.render('graduated', {titlePage: name + " Has Graduated!", title: name + " Has Graduated! Congratulations!", results: results});
            } else {
                // If the student has not graduated this renders the page with the new training result to be used again.
                res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: finalScore[1]});
            }
        })
    })
    // This runs the PUT HTTP method command for study/:name.  This is used to handle the money part for the student.
    .put(function(req, res) {
        let name = Db.cleanString(req.params.name);
        Students.work(name);
        // This renders the study page with more money :)

        // This uses a self-invoking callback function to return the results from Db.findStudent to this file. Asynchronicity

        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            res.render('study', {titlePage: name + "'s Training", title: name + "'s Training", results: results, trainingResult: "Gained $150 from working a few hours"})
        });
    });

// This handles all the routes for the /api/money/:name route
router.route('/api/money/:name')
    // This runs the PUT method for the api money call runs the same as the study put request but just returns JSON.
    .put(function(req, res) {
        let name = Db.cleanString(req.params.name);
        Students.work(name);
        Students.charge(name);
        Db.findStudent(name, (err, results) => {
            if (err) throw err;

            results = JSON.stringify(results);
            console.log("Put money ",results);
            res.render('api/money', {results: results});
        })
    // This runs the GET method for the api/money/:name route. It just returns the information from the database.
    }).get(function(req, res) {
        let name = Db.cleanString(req.params.name);
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            results = JSON.stringify(results);
            res.render('api/money', {results: results});
        })
    });

// This handles the routes for the /api/addStudent/:name route.
router.route('/api/addStudent/:name')
    // This is the POST method for the api/addStudent/:name route. This posts the new student to the database.
    .post(function(req, res) {
        let name = Db.cleanString(req.body.name);
	// This creates a new student object to insert in the database.
        student = new Students(req.body.name, req.body.age, req.body.ability, req.body.money);
	// This adds the student to the database
        student.addStudent();
	// This returns the information added to the database to the api.
        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            results = JSON.stringify(results);
            console.log("Added student ", results);
            res.render('api/addStudent', {results: results});
        })
    })
    // This handles the GET method for the api/addStudent/:name route. This just displays the information for the new student to the screen.
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

router.route('/api/training/:name')
    .post(function(req,res) {
        let name = Db.cleanString(req.params.name);
        // This is the main logic for the game it increases or decreases the ability attribute see Students.train() for more info.
        let finalScore = Students.train();
        console.log("FinalScore" + finalScore);
        // This updates the students ability
        Students.updateTraining(finalScore[0], name);
        Students.updateGraduate(name);
        // This is the logic that checks to see if the new ability qualifies the student for graduation or not this renders the congratulations page if the student has graduated.

        // This uses a self-invoking callback function to return the results from Db.findStudent to this file. Asynchronicity

        Db.findStudent(name, (err, results) => {
            if (err) throw err;
            console.log("Api results ability", results[0].ability);
                // This updates the graduate field in the database if the student has graduated.
                results = JSON.stringify(results);
                res.render('api/training', { results: results});
            })
        // If the student has not graduated this renders the page with the new training result to be used again.
    })
    .get(function(req, res) {
        name = Db.cleanString(req.params.name);
        console.log("Study/:name:" + name);

        // This calls the Db.findStudent(name, cb) which just grabs a students info from the database and returns it here for checking which page should be rendered.
        
        // This uses a self-invoking callback function to return the results from Db.findStudent to this file. Asynchronicity
        Db.findStudent(req.params.name, (err, results) => {
            if(err) throw err;
            results = JSON.stringify(results);
            console.log("ARE THESE RESULTS UPDATED");
            res.render('api/training',{results: results})
            
        });
    });
module.exports = router;
