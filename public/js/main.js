// When the document is done loading make all these functions available.
$(document).ready(function() {
	// I always like to check and make sure jQuery is working so there are no doubts when it comes to debugging		
    console.log("jQuery Works");

	// This controls what happens when you click the button with id addStudentForm.  As can be guessed by the name this button adds the student to the database.
    $("#addStudentForm").submit(function (e) {
        // This prevents the router from getting the data from the form immediately.
        e.preventDefault();
		// SerializeArray() method turns all form data into an array of names and values.
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
                // The back-end handles rendering the page to show a message stating the student has been added so this resets the form so another student can be added.
                document.getElementById("addStudentForm").reset();
            },
        })
    });

	// This handles the button with id moneyStudentForm.
    $("#moneyStudentForm").submit(function (e) {
        e.preventDefault();
        console.log("money clicked");
        // document.getElementById('testAjax').innerHTML = "Money Clicked";
		// This gets the name out of the url at for the current page to use for the :name parameter for the api page.
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
				// Not 100% sure I did this completely right.  Database keeps returning JSON format but as a string where the characters are converted to HTML encoding but this is a workable work-around.  It removes all the &#34; a.k.a double-quote symbols and joins it together with double-quotes then it splits it out of the [] because no need to have json inside an array.  Then it parses the data as json.
                data = data.split("&#34;");
                data = data.join("\"");
                data = data.split("[");
                data = data.join("");
                data = data.split("]");
                data = data.join("");
                data = JSON.parse(data);
				// Database has been updated but the page doesn't reflect this.  Since you can only add $150 at a time and the page is always $150 behind without refreshing I'm just adding the $150 now to be rendered.
                data.money = data.money + 150;
                console.log("data.money", data.money);
                console.log("ajax data" + data);
                console.log("data.name", data.name);
				// If the student has enough money but ran out of classes take out the next months payment and reset the countdown.
                // if (data.money >= 150 && data.classCountdown == 0) {
                //     data.money -= 150;
                //     data.classCountdown = 10;
                // }
				// Displays everything that needs to be displayed on the page.
                document.getElementById("tName").innerHTML = data.name;
                document.getElementById("tAge").innerHTML = data.age;
                document.getElementById("tAbility").innerHTML = data.ability;
                document.getElementById("tMoney").innerHTML = "$" + data.money;
                document.getElementById("tCountdown").innerHTML = data.classCountdown;
                document.getElementById('training-result').innerHTML = "Made $150 through a quick shift at work";
                // I have in the ejs of this page logic that disables the training button if there is not enough money and classCountdown == 0 so this just re-enables the button because if all of this worked the student has $150 to spend on more classes.
                document.getElementById("train").disabled = false;
            }
        });
    });
});
