
$(document).ready(function() {
    console.log("jQuery Works");

    $("#addStudentForm").submit(function (e) {
        import { Student } from "../../controllers/students";
        // This prevents the router from getting the data from the form immediately.
        e.preventDefault();
        // This POST's the data to the api/add/addEvents page
        student = new Student(sname, sAge, cAbility, cMoney);
        // tomorrow call methods to finish getting the data
        $.ajax({
          type: "POST",
        //   url: "../../views/api/addStudent.ejs",
          data: { student: student.toJSON()
          },
          error: console.log("Something went wrong"),
          success: function () {
              student.addStudent();
              console.log("POST worked");
              document.getElementById("addStudentForm").reset();
          },

        })
      });

    $("#trainStudentForm").submit(function (e) {
        e.preventDefault();
        console.log("trainStudentForm clicked");
        document.getElementById('textAjax').textContent(trainingMessage);
        $.ajax({
            type:"POST",
            data: {hi: "hello"},
            // url: "../../controllers/db.js",
            error: console.log("Is the ajax doing anything"),
            success: function() {
                console.log("this worked");
                document.getElementById('training-result').textContent(trainingMessage);
            }
        });
    });
});