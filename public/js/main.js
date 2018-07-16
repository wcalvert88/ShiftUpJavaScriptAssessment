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

    $("#train").submit(function (e) {
        e.preventDefault();
        let randNum = Math.ceil(Math.random() * 5);
        let training = 0;
        let trainingMessage = "";
        switch (randNum) {
            case 1:
                training = 1;
                trainingMessage = "You had a nice steady learning experience";
                break;
            case 2:
                training = -1;
                trainingMessage = "You were distracted most of the day and had to refresh what you already know";
                break;
            case 3:
                training = 2;
                trainingMessage = "You had a great day you learned more than what you set out to accomplish";
                break;
            case 4:
                training = -2;
                trainingMessage = "You had a terrible day and just couldn't figure anything out and started questioning what you already know";
                break;
            case 5:
                training = 5;
                trainingMessage = "You had an amazing day! You feel that you might just be a natural programmer";
                break;
            default:
                training = 0;
                trainingMessage = "I don't think it's possible for the code to get here but just in case Good Job you found a bug!"
                break;
        }

        let multiplyerNum = Math.random();
        let multiplyer = 1;
        if (multiplyerNum < 0.3) {
            multiplyer = 1;
        } else if (multiplyerNum < 0.5) {
            multiplyer = 1.5;
        } else if (multiplyerNum < 0.7) {
            multiplyer = 2;
        } else if (multiplyerNum < .9) {
            multiplyer = 2.5;
        } else {
            multiplyer = 3;  // Yes intentional 1/10th chance for 3x multiplyer
        }
        let finalScore = 0;
        if (training < 1) {
            finalScore = training;
        } else {
            finalScore = training * multiplyer;
        }
        $.ajax({
            type="PATCH",
            data={}
        })
    });
});