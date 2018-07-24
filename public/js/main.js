// import { Student } from "../../controllers/students";
$(document).ready(function() {
    console.log("jQuery Works");

    $("#addStudentForm").submit(function (e) {
        // This prevents the router from getting the data from the form immediately.
        e.preventDefault();
        let asf = $(this).serializeArray();
        console.log(asf);
        let name = asf[0].value;
        name = (name.split(" ")).join("-");
        // This POST's the data to the api/addStudent page
        let url = "/api/addStudent/" + name;
        $.ajax({
          type: "POST",
          url: url,
          data: { name: name, age: asf[1].value, ability: asf[2].value, money: asf[3].value 
          },
          error: console.log("Something went wrong"),
          success: function () {
              console.log("POST worked");
              document.getElementById("addStudentForm").reset();
          },

        })
      });

    // $("#trainStudentForm").submit(function (e) {
    //     e.preventDefault();
    //     console.log("trainStudentForm clicked");
    //     document.getElementById('testAjax').innerHTML = "TrainStudentForm clicked";
    //     $.ajax({
    //         type:"POST",
    //         // url: "../../routes/index.js",
    //         data: {hi: "hello"},
    //         // url: "../../controllers/db.js",
    //         error: console.log("Is the ajax doing anything"),
    //         success: function() {
    //             console.log("this worked");
    //             document.getElementById('training-result').innerHTML = "Training Clicked" ;
    //         }
    //     });
    // });

    $("#moneyStudentForm").submit(function (e) {
        e.preventDefault();
        console.log("money clicked");
        document.getElementById('testAjax').innerHTML = "Money Clicked";
        let link = window.location.href.split("/");
        let name = link[link.length - 1];
        console.log(name);
        let url = "/api/money/" + name;
        $.ajax({
            type: "PUT",
            url: url,
            datatype: "application/json",
            success: function(data) {
                console.log("money works");
                console.log("data ", data);
                data = data.split("&#34;");
                data = data.join("\"");
                data = data.split("[");
                data = data.join("");
                data = data.split("]");
                data = data.join("");
                data = JSON.parse(data);
                console.log("ajax data" + data);
                console.log("data.name", data.name);
                document.getElementById("tName").innerHTML = data.name;
                document.getElementById("tAge").innerHTML = data.age;
                document.getElementById("tAbility").innerHTML = data.ability;
                document.getElementById("tMoney").innerHTML = "$" +data.money;
                document.getElementById('training-result').innerHTML = "Made $150 through a quick shift at work";
            }
        });
    });
});