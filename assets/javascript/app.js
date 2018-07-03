$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCh0RnYKD7wnCTUh5BetlK3ihh3blgGxso",
        authDomain: "train-schedule-project-58663.firebaseapp.com",
        databaseURL: "https://train-schedule-project-58663.firebaseio.com",
        projectId: "train-schedule-project-58663",
        storageBucket: "",
        messagingSenderId: "447636450825"
    };
    firebase.initializeApp(config);

    // Create variable to reference the firebase.database()
    var database = firebase.database();

    // Create variables to store data that the user inputs in our form
    var trainName = "",
        destination = "",
        trainTime = "",
        frequencyMin = "";




    // Create on click function to add trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // Setting the variables to the usesrs input
        trainName = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = $("#train-time-input").val().trim();
        frequencyMin = $("#frequency-input").val().trim();

        // Doing the math to get Minutes Away and Next Arrival
        // Create references to frequency and time
        var currentTime = moment();
        var frequency = frequencyMin;
        var firstTime = trainTime;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // Create a variable to reference moment
        console.log("=====MOMENT=====");
        console.log("current time converted to HH:MM " + moment(currentTime).format("hh:mm"));
        // Logging firstTime and frequency
        console.log("First Train Departure Time Converted: " + firstTimeConverted.format("hh:mm"));
        console.log("Frequency (min): " + frequency);
        // Get the difference between firstTime minutes and now minutes
        var difference = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in times: " + difference);
        // Get the remainder of the difference divided by the frequency
        var remainder = difference % frequency;
        console.log("Remainder: " + remainder);
        // Get the minutes until the next train by subtracting the remainder from the frequency
        var minutesTil = frequency - remainder;
        console.log("Minutes until next train: " + minutesTil);
        // Next Train
        var nextTrain = moment().add(minutesTil, "minutes");
        console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
        



        // Creating a local "temporary" object for holding new train info
        var newTrain = {
            name: trainName,
            dest: destination,
            time: trainTime,
            freq: frequencyMin,
            minsAway: minutesTil,
            nextArrival: moment(nextTrain).format("hh:mm")
        };





        // Uploads train data to the firebase database
        database.ref().push(newTrain);

        // Logging everything to console
        console.log("=======FROM SUBMIT BUTTON CLICK========");
        console.log("Train Name: " + newTrain.name);
        console.log("Destination: " + newTrain.dest);
        console.log("First Train Departure: " + newTrain.time);
        console.log("Frequency (min) " + newTrain.freq);
        console.log("Minutes Away: " + newTrain.minsAway);
        console.log("Next Arrival: " + newTrain.nextArrival);

        // Modal "Train Successfully Added"

        // Clear all text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#train-time-input").val("");
        $("#frequency-input").val("");

    });



    // Create Firebase event for adding trains & update html
    database.ref().on("child_added", function (childSnapshot) {
        console.log("=======CHILD SNAPSHOT========");
        console.log(childSnapshot.val());


        // Store everything into a variable.
        var newName = childSnapshot.val().name;
        var newDest = childSnapshot.val().dest;
        var newTime = childSnapshot.val().time;
        var newFreq = childSnapshot.val().freq;
        var newMinsAway = childSnapshot.val().minsAway;
        var newNextArrival = childSnapshot.val().nextArrival;

        // Log
        console.log("=======CHILD SNAPSHOT VALUES========");
        console.log("Name: " + newName);
        console.log("Destination: " + newDest);
        console.log("First Train Time: " + newTime);
        console.log("Frequency: " + newFreq);
        console.log("Mins Away: " + newMinsAway);
        console.log("Next Arrival " + newNextArrival);


        // Create new Table Row
        var newRow = $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newDest),
            $("<td>").text(newFreq),
            $("<td>").text(newMinsAway),
            $("<td>").text(newNextArrival)
        );



        // Append new row to the table
        $("#train-table > tbody").append(newRow);
    });


    // sample from saturday class
    //  // Assumptions
    //  var tFrequency = 3;

    //  // Time is 3:30 AM
    //  var firstTime = "03:30";

    //  // First Time (pushed back 1 year to make sure it comes before current time)
    //  // This is arbitrary to just make sure our first train time is in the past
    //  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    //  console.log('FIRST TIME CONVERTED ' + firstTimeConverted.format('hh:mm'));

    //  // Current Time
    //  var currentTime = moment();
    //  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //  // Difference between the times
    //  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //  console.log("DIFFERENCE IN TIME: " + diffTime);

    //  // Time apart (remainder)
    //  var tRemainder = diffTime % tFrequency;
    //  console.log('TIME APART REMAINDER ' + tRemainder);

    //  // Minute Until Train
    //  var tMinutesTillTrain = tFrequency - tRemainder;
    //  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //  // Next Train
    //  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));











});