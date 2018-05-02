// DIRECTIONS
// You"ll create a trivia form with multiple choice or true/false options (your choice)
// The player will have a limited amount of time to finish the quiz.
// The game ends when the time runs out.
// The page will reveal number of questions that players answer correctly & incorrectly
// Don"t let the player pick more than one answer per question.
// Don"t forget to include a countdown timer.


// PSEUDOCODE
// have landing page (in HTML)
// will create on click for user to start the Game

// change so timer is for overall game, not per question
// once timer finishes, page will automatically tally number of correct, incorrent & unanswered questions

$(document).ready(function () {
// write variable for each question, runs through the game
// assign an answer for each question
// replace GIFs
    var options = [
    {
        question: "What led to Stanley famously asking Michael: 'Did I stutter?'", 
        choice: ["Michael stole his lunch.", "Michael wouldn't leave him alone during a meeting.", "Michael invited himself over for dinner.", "Michael made him lose a big client."],
        answer: 1,
        photo: "assets/images/pupusas.jpg"
        },
        {
        
        question: "What kitchen item does Stanley have two of after Pam & Roy call off their wedding?", 
        choice: ["Slow-cooker", "Blender", "Toaster", "Microwave"],
        answer: 2,
        photo: "assets/images/mtdew.gif"
        }, 
        {
        
        question: "After his heart attack, Stanley gets a nurse who he later has an affair with. What's her name?", 
        choice: ["Claudia", "Cassie", "Cynthia", "Courtney" ],
        answer: 2,
        photo: "assets/images/coffee.gif"
    }, 
    {
        question: "What condition does Stanley have?", 
        choice: ["High blood pressure", "Iron deficiency", "Asthma", "Diabetes" ],
        answer: 3,
        photo: "assets/images/harvey.jpg"
    }, 
    {
        question: "What is Stanley's hobby after he retires?", 
        choice: ["Painting caricatures", "Carving wooden birds", "Playing saxophone", "Gardening alongside at-risk youth" ],
        answer: 1,
        photo: "assets/images/dozen.jpg"
    }, 
    {
        question: "How much money does Stanley offer Dwight to never speak to him again?", 
        choice: ["Ten thousand Schrute bucks", "A million Stanley nickels", "A hundred Schrute dimes", "Half a million Stanley pennies" ],
        answer: 1,
        photo: "assets/images/herring.jpg"
    }, 
    {
        question: "Does Stanley have mustache?", 
        choice: ["Yes.", "No.", "Only in the winter.", "It's a goatee." ],
        answer: 0,
        photo: "assets/images/lemon.gif"
    }, 
    {
        question: "When the Dunder Mifflin employees go to trivia night Philadelphia, what team is Stanley is on?", 
        choice: ["A-team", "B-team/Backups", "Just for fun/The Einsteins", "He doesn't go." ],
        answer: 1,
        photo: "assets/images/guava.gif"
    }];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 30;
var intervalId;
var userGuess = "";
var running = false;
var questionCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
// start button begins the game
$("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
}
    })

// make the timer run for 30 seconds (per question?)
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
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;

    // timer stops once reaches 0
    if (timer === 0) {
        unanswerCount++;
        stop();
        // $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        // hidepicture();
    }	
}

// timer stop
function stop() {
    running = false;
    clearInterval(intervalId);
}
// picks question from array
// displays question and answer choices
function displayQuestion() {
    // generate random index in array, depending on question
    index = Math.floor(Math.random()*options.length);
    pick = options[index];

    //  run through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            // assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
}


//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
    //grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));

    //correct guess or wrong guess outcomes
    if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess="";
        $("#answerblock").html("<p>You got it!</p>");
        hidepicture();

    } else {
        stop();
        wrongCount++;
        userGuess="";
        $("#answerblock").html("<p>So close! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
    }
})
}


function hidepicture () {
    $("#answerblock").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index,1);

    var hidpic = setTimeout(function() {
        $("#answerblock").empty();
        timer= 30;

    // display performance tally
    if ((wrongCount + correctCount + unanswerCount) === questionCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over! Here are your results: </h3>");
        $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
        $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
        $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        displayQuestion();

    }
    }, 3000);


}

$("#reset").on("click", function() {
    $("#reset").hide();
    $("#answerblock").empty();
    $("#questionblock").empty();
    for(var i = 0; i < holder.length; i++) {
        options.push(holder[i]);
    }
    runTimer();
    displayQuestion();

})

})