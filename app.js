/**
 * Example store structure
 */
let store = {
  // 5 or more questions are required
  questions: [
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
  score: 0
};



function render()
{
  $("#quiz-window").html(constructQuiz(store.questions[store.questionNumber]));
  
  console.log("rendering, wooooo."); 
}
function constructQuiz(question)
{
  return `<h3>${question.question}</h3>
          <form id="quiz-form">
            <input type="radio" name="quiz-question" value="${question.answers.a}"/>
            <label>${question.answers.a}</label><br>
            <input type="radio" name="quiz-question" value="${question.answers.b}"/>
            <label>${question.answers.b}</label><br>
            <input type="radio" name="quiz-question" value="${question.answers.c}"/>
            <label>${question.answers.c}</label><br>
            <input type="radio" name="quiz-question" value="${question.answers.d}"/>
            <label>${question.answers.d}</label><br>
            <button id="submit-answer" type="submit">Submit</button>
          </form>`
  console.log("quiz constructed.");
}
function goToQuestion(question)
{
  console.log("switching to new question.");
}
function quizApp()
{
  render();
  initSubmit();
  console.log("Main function");
}


//TODO
function evaluateAnswer() {
  //Get currently selected radio

  //Compare selected radio to actual answer from current question object
  
}

function flagStatus(selectedRadio, eval) {
  //Take answer and change text class to match correct or incorrect
  if (eval) {
    selectedRadio.attr("class", "correct");
  }
}

//TODO
//Initialize the submit button
function initSubmit() {
  $('#quiz-form').on("submit", function(e) {
    e.preventDefault();
    //Check answers/radio buttons
    let selected = $("input[name='quiz-question']:checked").val();
    store.questionNumber++;
    render();
    //console.log($("input[name='quiz-question']:checked").val());
  });
}


$(quizApp);



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