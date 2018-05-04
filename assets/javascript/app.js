$(document).ready(function () {
// write variable for each question, runs through the game
// assign an answer for each question
    var options = [
    {
        question: "What led to Stanley famously asking Michael: 'Did I stutter?'", 
        choice: ["Michael stole his lunch.", "Michael wouldn't leave him alone during a meeting.", "Michael invited himself over for dinner.", "Michael made him lose a big client."],
        answer: 1,
        photo: "assets/images/stutter.gif"
        },
        {
        question: "What kitchen item does Stanley have two of after Pam & Roy call off their wedding?", 
        choice: ["Slow-cooker", "Blender", "Toaster", "Microwave"],
        answer: 2,
        photo: "assets/images/toasters.gif"
        }, 
        {
        question: "After his heart attack, Stanley gets a nurse who he later has an affair with. What's her name?", 
        choice: ["Claudia", "Cassie", "Cynthia", "Courtney" ],
        answer: 2,
        photo: "assets/images/affairs.gif"
    }, 
    {
        question: "What condition does Stanley have?", 
        choice: ["High blood pressure", "Iron deficiency", "Asthma", "Diabetes" ],
        answer: 3,
        photo: "assets/images/insulin.gif"
    }, 
    {
        question: "What is Stanley's hobby after he retires?", 
        choice: ["Painting caricatures", "Carving wooden birds", "Playing saxophone", "Gardening alongside at-risk youth" ],
        answer: 1,
        photo: "assets/images/powerwalk.gif"
    }, 
    {
        question: "How much money does Stanley offer Dwight to never speak to him again?", 
        choice: ["Ten thousand Schrute bucks", "A million Stanley nickels", "A hundred Schrute dimes", "Half a million Stanley pennies" ],
        answer: 1,
        photo: "assets/images/sass.gif"
    }, 
    {
        question: "Does Stanley have mustache?", 
        choice: ["Yes.", "No.", "Only in the winter.", "It's a goatee." ],
        answer: 0,
        photo: "assets/images/nod.gif"
    }, 
    {
        question: "When the Dunder Mifflin employees go to trivia night Philadelphia, what team is Stanley is on?", 
        choice: ["A-team", "B-team/Backups", "Just for fun/The Einsteins", "He doesn't go." ],
        answer: 1,
        photo: "assets/images/blink.gif"
    }];

// displays count at the end of the game
var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
// enabled per question
var timer = 10;
var intervalId;
// determined by user
var userGuess = "";
var running = false;
// selector
var questionCount = options.length;
var selected;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
// on click for user to start the Game
$("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
}
    })

// make the timer run for 10 seconds (per question...is ok?)
// automatically renews
function runTimer(){
    if (!running) {
    intervalId = setInterval(decrement, 1000); 
    running = true;
    }
}

// timer capability to run
// begins after click (decreases in increment of one second)
function decrement() {
    $("#timeLeft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
    $("#answerBox").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
    hidepicture();

    // timer stops once reaches 0
    if (timer === 0) {
        unanswerCount++;
        stop();
    }	
}

// timer stop
function stop() {
    running = false;
    clearInterval(intervalId);
}
// picks question from array
// displays question and answer choices
function displayQuestion(){
    // generate random index in array, depending on question
    index = Math.floor(Math.random()*options.length);
    selected = options[index];

    //  run through answer array and display
        $("#questionBox").html("<h2>" + selected.question + "</h2>");
        for(var i = 0; i < selected.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(selected.choice[i]);
            // assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerBox").append(userChoice);
}


//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));

    //correct guess or wrong guess outcomes
    if (userGuess === selected.answer) {
        stop();
        correctCount++;
        userGuess="";
        $("#answerBox").html("<p>You got it!</p>");
        hidepicture();

    } else {
        stop();
        wrongCount++;
        userGuess="";
        $("#answerBox").html("<p>So close! The correct answer is: " + selected.choice[selected.answer] + "</p>");
        hidepicture();
    }
})
}

function hidepicture () {
    $("#answerBox").append("<img src=" + selected.photo + ">");
    newArray.push(selected);
    options.splice(index,1);

    var hidpic = setTimeout(function() {
        $("#answerBox").empty();
        timer= 10;

    // once game finishes, tally number of correct, incorrent & unanswered questions
    if ((wrongCount + correctCount + unanswerCount) === questionCount) {
        $("#questionBox").empty();
        $("#questionBox").html("<h3>Game Over! Here are your results: </h3>");
        $("#answerBox").append("<h4> Correct: " + correctCount + "</h4>" );
        $("#answerBox").append("<h4> Incorrect: " + wrongCount + "</h4>" );
        $("#answerBox").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        displayQuestion();

    }
    // time displayed after question answered
    }, 6000);


}

$("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerBox").empty();
    $("#questionBox").empty();
    for(var i = 0; i < holder.length; i++) {
        options.push(holder[i]);
    }
    runTimer();
    displayQuestion();

})

})