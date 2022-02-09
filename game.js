var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];

var level = 0;
var ket = 0;

$(document).keypress(function () {
    if (ket === 0) {
        nextSequence();
        ket++;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userChosenPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
        if (gamePattern.length === userChosenPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        document.querySelector("#" + currentColour).classList.remove("pressed");
    }, 100);
}
function nextSequence() {
    userChosenPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver() {
    ket = 0;
    level = 0;
    gamePattern = [];
}