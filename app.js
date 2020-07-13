'use strict';
/**
 * Example store structure
 */
let store = {
  // 5 or more in questionPool are required
  questionPool: [
    {
      question: 'When did the frozen pizza hit the american market?',
      answers: [
        '1824',
        '1961',
        '1962',
        'Frozen pizza isnt pizza at all'
      ],
      correctAnswer: '1962',
      correct: true
    },
    {
      question: 'Pineapple on pizza was invented where??',
      answers: [
        'Canada',
        'Japan',
        'Italy',
        'United States'
      ],
      correctAnswer: 'Canada',
      correct: true
    },
    {
      question: 'The health benefits of pizza are?',
      answers: [
        'Cures everything.',
        'Reduces heart disease.',
        'Reduces cancer risk.',
        'Lol there are no benefits.'
      ],
      correctAnswer: 'Reduces cancer risk.',
      correct: true
    },
    {
      question: 'In Japan what is the favored way to eat pizza?',
      answers: [
        'With taco sauce.',
        'With mayo.',
        'With fried bananas.',
        'With teriyaki sauce and butter.'
      ],
      correctAnswer: 'With mayo.',
      correct: true
    },
    {
      question: 'What month is national pizza month?',
      answers: [
        'December',
        'October',
        'January',
        'EVERY MONTH'
      ],
      correctAnswer: 'October',
      correct: true
    }
  ],
  lastSelected: "",
  questionNumber: 0,
  score: 0,
  pageType:0,
  selectedIndex:0,
  getQuizLength: function() { return this.questionPool.length; },
  nextQuestion: function() {this.questionNumber = (this.questionNumber + 1)%this.getQuizLength();}
};



//***MAIN FUNCTION***//
//Run full Quiz App
function quizAppMain()
{
  render();
}

//***CONSTRUCTION/TEMPLATE FUNCTIONS FOR HTML PAGES***//
//Create template form for quiz
function constructQuiz()
{
  return `  
    <form id="quiz-form">
      
    </form>
    `;
}
//Create template for question to place inside quiz form
function constructQuestion(quizQuestion) {
  return `
    <header>
    <h3>${quizQuestion.question}</h3>
    <h3>Question:${store.questionNumber + 1}/${store.getQuizLength()}</h3>
    </header>
    <div class="container">
      <img src="img/pizza${store.questionNumber+1}.jpg" alt="Pizza Image"/>
      <div class="question-container">
        ${constructAnswers(quizQuestion.answers)}
      </div>
      <button id="submit-answer" type="submit">Submit</button>
    </div>
  `;
}
//Template for each answer for question
function constructAnswers(questionAnswers)
{
  return questionAnswers.reduce(function(html,answer){
    return html += `<span class="question-row"><input type="radio" name="quiz-question" value="${answer}"/>
    <label>${answer}</label><br></span>`;
  },``);
}
//Template for after the question is answered
function constructAnswerPage(quizQuestion) {
  console.log(quizQuestion);
  return `
    <h2>${quizQuestion.question}</h2>
    <h2>${quizQuestion.result}: The answer was <span class="answer">${quizQuestion.correctAnswer}</span></h2>
    <div class="button-container"><button id="continue" type="button">Contine</button></div>
    `;
}
//Template for first page
function constructStartPage() {
  return `
    <h2 class="header-container">Click start to begin.</h2>
    <div class="button-container"><button id="start" type="button">Start Quiz</button></div>
    `;
}
//Template for after quiz is completed
function constructResultPage() {
  return `
    <h2 class="header-container">You got: ${store.score * (100/store.getQuizLength())}%!!!</h2>
    <h2>Try again?</h2>
    <div class="button-container"><button id="reset" type="button">Restart</button></div>
  `;
}

//***RENDERING FUNCTION SECTION***//
//These should not create the html templates
//Display full page
//Display different page based on quiz storage state
function render()
{
  switch(store.pageType)
  {
    //Start Page
    case 0:
      renderQuiz();
      renderStartPage();
      handleStartButton();
<<<<<<< HEAD

      
=======
>>>>>>> cac94af54ceca62f5d91a1bc7adb5bb71bee4c4a
      break;
    //Question Page
    case 1:
      renderQuiz();
      renderQuestion();
      handleSubmitButton();
      break;
    //Answer Page
    case 2:
      renderQuiz();
      renderAnswerPage();
<<<<<<< HEAD
      handleContinueButton();                                                                                                                                                                                                      
=======
      handleContinueButton();
>>>>>>> cac94af54ceca62f5d91a1bc7adb5bb71bee4c4a
      break;
    //Result Page
    case 3:
      renderQuiz();
      renderResultPage();
      handleResetButton();
      break;
  } 
}
//Set quiz values
function initValues()
{
  store.questionNumber = 0;
  store.score = 0;
  store.pageType = 0;
  store.lastSelected = "";
}

//Display quiz
function renderQuiz()
{
  $("#quiz-window").html(constructQuiz());
}
//Display question
function renderQuestion()
{
  $("#quiz-form").html(constructQuestion(store.questionPool[store.questionNumber]));
}
//Display answer page
function renderAnswerPage()
{
  $("#quiz-form").html(constructAnswerPage(store.questionPool[store.questionNumber]));
}
//Display the Starting page
function renderStartPage()
{
  $("#quiz-form").html(constructStartPage());
}
//Display the End Page
function renderResultPage()
{
  $("#quiz-form").html(constructResultPage());
}



//***EVALUATION FUNCTIONS***//
//Check given answer matches correct answer
function evaluateAnswer(selectedAnswer) {
  //Check if an answer is picked
  if (selectedAnswer !== undefined) {
    $('html').off("keydown");
    return store.questionPool[store.questionNumber].correctAnswer === selectedAnswer;

  }
  //Request user to pick an answer
  throw Error("No answer.");
}
//Change CSS colors based on answer
function answerColor(correct) {
  //Green
  if (correct) {
    $("body").attr("class", "correct-body");
    $("#quiz-form").attr("class", "correct-form");
    $("#continue").attr("class", "correct");
  }
  //Red
   else {
    $("body").attr("class", "incorrect-body");
    $("#quiz-form").attr("class", "incorrect-form");
    $("#continue").attr("class", "incorrect");
  }
}
//Set CSS colors back to default
function resetColor() {
  $("body").attr("class", "");
  $("#quiz-form").attr("class", "");
  $("#continue").attr("class", "");
}



//***BUTTON/EVENT FUNCTIONS ***/
//Set selected answer from question storage to checked
function selectAnswer(questionAnswers, index)
{
  let selectedAnswer = $(`input[value="${questionAnswers[index]}"]`);
  selectedAnswer.attr("checked",true);
}
//Unselect other answers and set to unchecked
function unselectAnswer(questionAnswers, index)
{
  let selectedAnswer = $(`input[value="${questionAnswers[index]}"]`);
  selectedAnswer.attr("checked",false);
}
//Event listener for Submit button
//Keyboard inputs also work
function handleSubmitButton() {
  $('html').on("keydown", function(e) {
    if(e.which === 38)
    {
      store.selectedIndex = (store.selectedIndex + 7)%store.questionPool[store.questionNumber].answers.length;
      unselectAnswer(store.questionPool[store.questionNumber].answers,(store.selectedIndex + 1)%store.questionPool[store.questionNumber].answers.length);
      selectAnswer(store.questionPool[store.questionNumber].answers,store.selectedIndex);
    }
    else if(e.which === 40)
    {  
      store.selectedIndex = (store.selectedIndex + 1)%store.questionPool[store.questionNumber].answers.length;
      unselectAnswer(store.questionPool[store.questionNumber].answers,(store.selectedIndex + 7)%store.questionPool[store.questionNumber].answers.length);
      selectAnswer(store.questionPool[store.questionNumber].answers,store.selectedIndex);  
    }
    else if(e.which === 13 || e.which === 39)
    {
      submitBtn(e);
    }
  });
  $('#quiz-form').on("submit", function(e) {
    submitBtn(e); 
  });
}
//Run the answer checks after submit is entered
function submitBtn(e)
{
  e.preventDefault();
  //Check answers/radio buttons
  let selectedAnswer = $("input[name='quiz-question']:checked");
  store.lastSelected = selectedAnswer;
  //Check selected answer with actual answer for current question
  let evalResult = evaluateAnswer(selectedAnswer.val());
  if(evalResult)
  {
    store.score++;
    store.questionPool[store.questionNumber].result = "That's right! "
  }
  else
  {
    store.questionPool[store.questionNumber].result = "Nope! "
  }
  store.pageType = 2;
  render();
  answerColor(evalResult);
}
//Event listener for Continue button
function handleContinueButton() {
  
  $('html').on("keydown", function(e) {
    if(e.which === 13 || e.which === 39)
    {
      $('html').off("keydown");
      continueBtn(e);
    }    
  });
  $('#quiz-form').on("click", "#continue", function(e) {
    continueBtn(e);
  });
}
//Display next page
function continueBtn(e)
{
  e.preventDefault();
  store.pageType = 1;
  if(store.questionNumber === (store.getQuizLength()-1))
  {
    store.pageType = 3;
  }
  else
  {
    store.nextQuestion();
  }
  render();
  resetColor();
}
//Event listener for starting the quiz
function handleStartButton()
{
  $('html').on("keydown", function(e) {
    if(e.which === 13 || e.which === 39)
    {
      $('html').off("keydown");
      startBtn(e);
    }
  });
  $('#quiz-form').on("click", "#start", function(e) {
    startBtn(e);    
  });
}
//Start the quiz
function startBtn(e)
{
  e.preventDefault();
  console.log("Start!");
  store.pageType = 1;
  render();
}
//Event listener for Reset button
function handleResetButton()
{
  $('html').on("keydown", function(e) {
    if(e.which === 13 || e.which === 39)
    {
      $('html').off("keydown");
      resetBtn(e);

      console.log("Enter or Right Arrow");
    }
  });
  $('#quiz-form').on("click", "#reset", function(e) {
    resetBtn(e);
  });
}
//Restart the Quiz
function resetBtn(e)
{
  e.preventDefault();
  console.log("resetPressed");
  initValues();
  render();
}

$(quizAppMain);



/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)