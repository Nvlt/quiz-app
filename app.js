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
      question: 'In japan what is the favored way to eat pizza?',
      answers: [
        'With taco sauce.',
        'With Mayo.',
        'With fried bananas.',
        'With teriyaki sauce and butter.'
      ],
      correctAnswer: 'With Mayo.',
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
  lastSelected:"",
  questionNumber: 0,
  score: 0,
  pageType:0,
  selectedIndex:0,
  getQuizLength: function() { return this.questionPool.length },
  nextQuestion: function() {this.questionNumber = (this.questionNumber + 1)%this.getQuizLength();}
};



//***MAIN FUNCTION***//
//Run full Quiz App
function quizAppMain()
{
  //Should render first page before rendering quiz pages
  //Render first page

  //Remove below after first page is established
  render();

  //Probably put in quizPage function
  
}


//***CONSTRUCTION/TEMPLATE FUNCTIONS FOR HTML PAGES***//
//Create template form for quiz
function constructQuiz()
{
  return `
    <div class="quiz-container">
      <form id="quiz-form">
        
      </form>
    </div>
    `;
}
//Create template for question to place inside quiz form
function constructQuestion(quizQuestion) {
  return `
    <header>
    <h3>${quizQuestion.question}</h3>
    <h3>Question:${store.questionNumber + 1}/${store.getQuizLength()}</h3>
    </header>
    <div class="question-container">
      ${constructAnswers(quizQuestion.answers)}
    </div>
    <button id="submit-answer" type="submit">Submit</button>
  `;
}
function constructAnswers(questionAnswers)
{
  return questionAnswers.reduce(function(html,answer){
    return html += `<span class="question-row"><input type="radio" name="quiz-question" value="${answer}"/>
    <label>${answer}</label><br></span>`;
  },``)
}

function constructAnswerPage(quizQuestion) {
  console.log(quizQuestion);
  return `
    <h2>${quizQuestion.question}</h2>
    <h2>The answer was ${quizQuestion.correctAnswer}</h2>
    <button id="continue" type="button">Contine</button>
    `;
}

function constructStartPage() {
  return `
    
    <h3>Click start to begin.</h3>
    <button id="start" type="button">Start Quiz</button>
    `;
}

function constructResultPage() {
  return `
    <h2>You got:${store.score * (100/store.getQuizLength())}%!!!</h2>
    <h2>Try again?</h2>
    <button id="reset" type="button">restart</button>
    `;
}

//***RENDERING FUNCTION SECTION***//
//These should not create the html templates
//Display full page
function render()
{

  switch(store.pageType)
  {
    //Start Page
    case 0:
      renderQuiz();
      renderStartPage();
      handleStartButton()
      break;
    //Question Page
    case 1:
      renderQuiz();
      renderQuestion();
      handleSubmitButton();
      break;
    //Answer Page
    case 2:
      renderAnswerPage();
      handleContinueButton();
      break;
    //Result Page
    case 3:
      renderQuiz();
      renderResultPage();
      handleResetButton();
      break;
    
  }
  
  
}
//Reset quiz values
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
function renderStartPage()
{
  $("#quiz-form").html(constructStartPage());
}
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
    return store.questionPool[store.questionNumber].correctAnswer == selectedAnswer;

  }
  //Request user to pick an answer
  throw Error("No answer.");
}




//***BUTTON/EVENT FUNCTIONS ***/
//Initialize the submit button
function selectAnswer(questionAnswers, index)
{
  let selectedAnswer = $(`input[value="${questionAnswers[index]}"]`);
  selectedAnswer.attr("checked",true);
  console.log(`Select index:${index}`);


}
function unselectAnswer(questionAnswers, index)
{
  let selectedAnswer = $(`input[value="${questionAnswers[index]}"]`);
  selectedAnswer.attr("checked",false);
  console.log(`Unselect index:${index}`);


}
function handleSubmitButton() {
  
  
  
  $('html').on("keydown", function(e) {
    
    
    if(e.which == 38)
    {
      store.selectedIndex = (store.selectedIndex + 7)%store.questionPool[store.questionNumber].answers.length;
      unselectAnswer(store.questionPool[store.questionNumber].answers,(store.selectedIndex + 1)%store.questionPool[store.questionNumber].answers.length);
      selectAnswer(store.questionPool[store.questionNumber].answers,store.selectedIndex);
      
      console.log("Up Arrow");
    }
    else if(e.which == 40)
    {  
      store.selectedIndex = (store.selectedIndex + 1)%store.questionPool[store.questionNumber].answers.length;
      unselectAnswer(store.questionPool[store.questionNumber].answers,(store.selectedIndex + 7)%store.questionPool[store.questionNumber].answers.length);
      selectAnswer(store.questionPool[store.questionNumber].answers,store.selectedIndex);  

      console.log("Down Arrow");
    }
    else if(e.which == 13 || e.which == 39)
    {
      submitBtn(e);

      console.log("Enter or Right Arrow");
    }
    else
    {
      console.log(e.which);
    }
    
  });
  $('#quiz-form').on("submit", function(e) {
    
    submitBtn(e); 
    
  });
}
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
    }
    store.pageType = 2;
    console.log(store.questionNumber);
    render();
}

function handleContinueButton() {
  
  $('html').on("keydown", function(e) {
    if(e.which == 13 || e.which == 39)
    {
      
      $('html').off("keydown");
      continueBtn(e);

      console.log("Enter or Right Arrow");
    }
    else
    {
      console.log(e.which);
    }
    
  });

  $('#quiz-form').on("click", "#continue", function(e) {
    continueBtn(e);
  });
}
function continueBtn(e)
{
  e.preventDefault();
    console.log("Continue!!!");
    store.pageType = 1;
    if(store.questionNumber == (store.getQuizLength()-1))
    {
      store.pageType = 3;
    }
    else
    {
      store.nextQuestion();
    }
    
    
    render();
}
function handleStartButton()
{
  $('html').on("keydown", function(e) {
    
    if(e.which == 13 || e.which == 39)
    {
      $('html').off("keydown");
      startBtn(e);

      console.log("Enter or Right Arrow");
    }
    else
    {
      console.log(e.which);
    }
    
  });
  
  
  $('#quiz-form').on("click", "#start", function(e) {
    startBtn(e);    
  });
}
function startBtn(e)
{
  e.preventDefault();
  console.log("Start!");
  store.pageType = 1;
  render();
}
function handleResetButton()
{
  $('html').on("keydown", function(e) {
    
    if(e.which == 13 || e.which == 39)
    {
      $('html').off("keydown");
      resetBtn(e);

      console.log("Enter or Right Arrow");
    }
    else
    {
      console.log(e.which);
    }
    
  });
  $('#quiz-form').on("click", "#reset", function(e) {
    resetBtn(e);
  });
}
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