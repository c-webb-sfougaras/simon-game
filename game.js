// alert("hello")
const express = require("express")
let gamePattern = [];
const app = express()
let userClickedPattern = [];

let level = 0;

let buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  $("h2").text(``);
  var randomNumber = Math.floor(Math.random() * 4);
  let randomColour = buttonColours[randomNumber];
  userClickedPattern = [];

  gamePattern.push(randomColour);

  let randomColourID = "#" + randomColour;

  $(randomColourID).fadeOut(100).fadeIn(100);

  var randomColourSound = new Audio("sounds/" + randomColour + ".mp3");

  randomColourSound.play();
  level++;
  $("h1").text("Level " + level);

  return randomNumber;
}

if (level > 0) {
}

// function removePressed(userChosenColour) {
//   $("#" + userChosenColour).removeClass("pressed");
// }

function animatePress(userChosenColour) {
  $("#" + userChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
}

var mostRecentGamePatternIndex = gamePattern.length;

$("div[type=button]").click(function (event) {
  var userChosenColour = event.target.id;

  var clickedColourSound = new Audio("sounds/" + event.target.id + ".mp3");
  userClickedPattern.push(userChosenColour);
  var mostRecentAnswerIndex = userClickedPattern.length - 1;
  animatePress(userChosenColour);
  checkAnswer(mostRecentAnswerIndex);

  clickedColourSound.play();
});

$(document).keypress(function (event) {
  if (level === 0) {
    console.log(level);
    nextSequence();
  }
  console.log(level);
});

function checkAnswer(userSelected) {
  console.log(gamePattern + " game pattern");
  console.log(userClickedPattern + " userPattern");
  console.log(userSelected, userClickedPattern[userSelected]);
  if (gamePattern[userSelected] === userClickedPattern[userSelected]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("h1").text(`Game Over, Press Any Key To Restart`);
    $("h2").text(`Your Score Was ${level - 1}`);
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}

let port = process.env.PORT;
if (port == null|| port ==""){
  port = 3000
}

app.listen(port, function(){
  console.log("Server started successfully")
})