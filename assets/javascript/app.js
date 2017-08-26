// William Rainaud
// Rutgers Coding Bootcamp 
// Homework Assignment 5 - Trivia Game

$(document).ready(function() {

$('#message').text('Click the button below to Start the Game!');


    // Show only New Game info on page load
  $('.game').hide();
  $('.results').hide();


  // Set Variables
  
  var correct;
  var wrong;
  var answer;
  var counter;
  var count;
  var timeout;
  var i = 0;

  var activeQuestion = {
    question: "",
    answer: '',
    choices: [],
  }

  // Questions 
    // Possible Answers
    // Correct Answer

  // This will be filled in during New Game function and emptied out throughout the game
  var questions = {};

  function setQuestions() {
    questions = {
      q1: {
        question: "Which is the luxury division of Honda Motor Company?",
        answer: 'Acura',
        choices: ['Audi', 'Mercedez-Benz', 'Acura', 'Lexus'],
      },
      q2: {
        question: "What was the first model year of the Honda Ridgeline?",
        answer: '2006',
        choices: ['2001', '2005', '2003', '2006'],
      },
      q3: {
        question: "What was the last model year of the Acura Integra?",
        answer: '2001',
        choices: ['2001', '1998', '2006', '2000'],
      },
      q4: {
        question: "Prior to the 2017 Honda Civic Type-R, Honda only manufactuered 1 automobile with a stock turbocharger in the United States. What vehicle was it?",
        answer: 'Acura RDX',
        choices: ['Acura NSX', 'Honda Civic Si', 'Acura RDX', 'Acura Integra Type-R'],
      },
      q5: {
        question: "Which car was the immediate successor to the Honda CR-X?",
        answer: 'Del Sol',
        choices: ['CR-Z', 'S2000', 'Del Sol', 'Civic'],
      },
      q6: {
        question: "What was the last model year of the Acura Integra?",
        answer: '2001',
        choices: ['2001', '1998', '2006', '2000'],
      },
      q7: {
        question: "What is Honda's current slogan?",
        answer: 'The Power of Dreams',
        choices: ['Moving Forward', 'The Ultimate Driving Machine', 'The Power of Dreams', 'Go Further'],
      },
      
    };
  }


  // Timer Settings
  var questionTimer = {
    //Time Per Question
    time: 15,
    reset: function(t) {
      questionTimer.time = t;
      $('.timeLeft').html('Time Left: ' + questionTimer.time);
    },
    gameTimeout: function(){
      timeout = setTimeout(questionTimer.timeUp, 1000*16);
    },
    count: function() {
      $('.timeLeft').html('Time Left: ' + questionTimer.time);
      questionTimer.time--;
    },
    countDown: function(){
      counter = setInterval(questionTimer.count,1000);
    },
    stopTimer: function(){
      clearInterval(counter);
    },
    timeUp: function(){
      wrong++;
      questionTimer.reset(5)
      $('.answers').html('<h2>Incorrect! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);
    },
  };

  // Run this to make sure there are still questions left
  function gameOver() {
    if (Object.keys(questions).length === 0) {
      questionTimer.stopTimer();
      $('.game').hide();
      $('.results').show();
      $('.correct').html('Number Correct: ' + correct);
      $('.wrong').html('Number Incorrect: ' + wrong);
      $('#message').hide();
      activeQuestion = false;
    };
  };

  // Check if selected answer is correct or incorrect
  function answerCheck() {
    if (answer == activeQuestion.answer && questionTimer.time > 0) {
      correct++;
      questionTimer.reset(5);
      $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
      setTimeout(game, 5000);   
    }
      
    if (answer != activeQuestion.answer){
      questionTimer.timeUp();
    }
  }

   //Randomize order of possible answers
  function randomize() {
    activeQuestion.choices.sort(function() { 
      return 0.5 - Math.random(); 
    });
  };

  // Starts up the game
  function game(){

    // Checks to see if there are no more questions first
    gameOver();

    // If there are still questions left
    if (Object.keys(questions).length > 0) {

      // Get Question
      var keys = Object.keys(questions);
      var objIndex = keys[ keys.length * Math.random() << 0];
      activeQuestion = questions[objIndex];

      // Reorder the choices so it's not obvious
      randomize();

      // Delete question so it can't be pulled again
      delete questions[objIndex];

      // Empty out answer area from previous question
      $('.answers').empty();

      // Stop and Reset timer incase it was running
      questionTimer.stopTimer();
      questionTimer.reset(15);
      questionTimer.gameTimeout();

      // Start Timer
      questionTimer.countDown();

      // Place question information into .game area
      $('.question').html(activeQuestion.question);
      // Reset counter
      i=0;

      //Create buttons for possible answers
      $(activeQuestion.choices).each(function() {
      $('.option1').text(activeQuestion.choices[0]);
      $('.option2').text(activeQuestion.choices[1]);
      $('.option3').text(activeQuestion.choices[2]);
      $('.option4').text(activeQuestion.choices[3]);
      i++;
      });
    }; 

    // When you click on a possible answer
    $('.option').on('click', function(){
        answer = $(this).html();
        answerCheck();
        clearTimeout(timeout);
      });
  };

  // Glowing Buttons Function
  var glower = $('.myGlower');
    window.setInterval(function() {  
      glower.toggleClass('active');
    }, 700);

   // New Game Function
    // Resets score to zero
    // Sets new time countdown
  function newGame() {
    $('.results').hide();
    $('#message').text(" ");
    // questions = questionInfo;
    correct = 0;
    wrong = 0;
    $('.game').show();
  }

  $(".startGame").on('click', function(){
    $('#myCarousel').hide();
    $('#startGameButton').hide();
    $('#message').text(" ");

    setQuestions();
    newGame();
    game();
  });

  $("#resetGameButton").on('click', function(){
    $('#startGameButton').hide();
    $('#resetGameButton').hide();

    setQuestions();
    newGame();
    game();
  });


 });
  

