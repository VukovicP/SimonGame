
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;


//Klik na dugmad odrednjene boje
$(".btn").click(function() {
    //Getting the id of the colour that user has clicked
    var userChosenColour = $(this).attr("id");

    //Collecting the colours that user has clicked
    userClickedPattern.push(userChosenColour);

    console.log("This is userClickedPattern: " + userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var lastAnswerIndex = userClickedPattern.length - 1;
    checkAnswer(lastAnswerIndex);
    console.log("Provjera: " + lastAnswerIndex);
});


//Pritisak tastera na tastaturi radi pocetka igre
$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    //Choosing random colour
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    //Adding random colour to the end of an array
    gamePattern.push(randomChosenColour);

    //Animation for button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Playing the sound of the random chosen colour
    playSound(randomChosenColour);

    console.log("Random Colour: " + randomChosenColour);
}


//Function for playing sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//Function for animating button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    //Added function for removing pressed class
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 200);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("fail");

        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("GAME OVER, Press Any Key to Restart");

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
