import { Student } from "../../controllers/students";
$(document).ready(function() {
    console.log("jQuery Works");

    $("#addStudentForm").submit(function (e) {
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

})