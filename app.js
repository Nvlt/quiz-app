/**
 * Example store structure
 */
let store = {
  // 5 or more questionPool are required
  questionPool: [
    {
      question: 'When did the frozen pizza hit the american market?',
      answers: {
        a:'1824',
        b:'1961',
        c:'1962',
        d:'Frozen pizza isnt pizza at all'
      },
      correctAnswer: '1962'
    },
    {
      question: 'Pineapple on pizza was invented where??',
      answers: {
        a:'Canada',
        b:'Japan',
        c:'Italy',
        d:'United States'
      },
      correctAnswer: 'Canada'
    },
    {
      question: 'The health benefits of pizza are?',
      answers: {
        a:'Cures everything.',
        b:'Reduces heart disease.',
        c:'Reduces cancer risk.',
        d:'Lol there are no benefits.'
      },
      correctAnswer: 'Reduces cancer risk.'
    },
    {
      question: 'In japan what is the favored way to eat pizza?',
      answers: {
        a:'With taco sauce.',
        b:'With Mayo.',
        c:'With fried bananas.',
        d:'With teriyaki sauce and butter.'
      },
      correctAnswer: 'With Mayo.'
    },
    {
      question: 'What month is national pizza month?',
      answers: {
        a:'December',
        b:'October',
        c:'January',
        d:'EVERY MONTH'
      },
      correctAnswer: 'October'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  maxLength:5
};



//***MAIN FUNCTION***//
//Run full Quiz App
function quizAppMain()
{
  //Should render first page before rendering quiz pages
  //Render first page

  //Remove below after first page is established
  renderQuizPage();

  //Probably put in quizPage function
  initSubmit();
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
function constructQuestion(question) {
  return `
    <h3>${question.question}</h3>
    <div class="question-container">
    <span class="question-row"><input type="radio" name="quiz-question" value="${question.answers.a}"/>
    <label>${question.answers.a}</label><br></span>
    <span class="question-row"><input type="radio" name="quiz-question" value="${question.answers.b}"/>
    <label>${question.answers.b}</label><br></span>
    <span class="question-row"><input type="radio" name="quiz-question" value="${question.answers.c}"/>
    <label>${question.answers.c}</label><br></span>
    <span class="question-row"><input type="radio" name="quiz-question" value="${question.answers.d}"/>
    <label>${question.answers.d}</label><br></span>
    </div>
    <button id="submit-answer" type="submit">Submit</button>
  `;
}


//***RENDERING FUNCTION SECTION***//
//Display full page
function renderQuizPage()
{
  renderQuiz();
  renderQuestion();
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




//***EVALUATION FUNCTIONS***//
//Check given answer matches correct answer
function evaluateAnswer(selectedAnswer) {
  let correctAnswer = store.questionPool[store.questionNumber].correctAnswer;
  console.log(correctAnswer);
  //compare selected answer to correct answer
  return selectedAnswer === correctAnswer;  
}

//Flag answer based on given evaluation
function flagStatus(selectedRadio, eval) {
  //Take answer and change text class to match correct or incorrect
  let questionLabel = selectedRadio.next("label");
  //Set correct answer to '.correct' class, probably remove this part in favor of another indicator though
  if (eval) {
    $(questionLabel).attr("class", "correct")
  }
  //Set selected answer to '.incorrect' class
  else {
    $(questionLabel).attr("class", "incorrect")
  }
}

//Check and go to next question
function nextQuestion(eval)
{
  if(eval)
  {
    store.questionNumber = (store.questionNumber + 1)%store.maxLength;
    renderQuestion();
  }
}

//***BUTTON/EVENT FUNCTIONS ***/
//Initialize the submit button
function initSubmit() {
  $('#quiz-form').on("submit", function(e) {
    e.preventDefault();
    //Check answers/radio buttons
    let selectedAnswer = $("input[name='quiz-question']:checked");
    //Check selected answer with actual answer for current question
    let evalResult = evaluateAnswer(selectedAnswer.val());
    //Change selected label if wrong, otherwise move on to next question
    flagStatus(selectedAnswer, evalResult);
    //If correct, render the next question
    nextQuestion(evalResult);
  });
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