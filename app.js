/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'When did the frozen pizza hit the american market?',
      answers: [
        '1824',
        '1961',
        '1962',
        'Frozen pizza isnt pizza at all'
      ],
      correctAnswer: '1962'
    },
    {
      question: 'Pineapple on pizza was invented where??',
      answers: [
        'Canada',
        'Japan',
        'Italy',
        'United States'
      ],
      correctAnswer: 'Canada'
    },
    {
      question: 'The health benefits of pizza are?',
      answers: [
        'Cures everything.',
        'Reduces heart disease.',
        'Reduces cancer risk.',
        'Lol there are no benefits.'
      ],
      correctAnswer: 'Reduces cancer risk.'
    },
    {
      question: 'In japan what is the favored way to eat pizza?',
      answers: [
        'With taco sauce.',
        'With Mayo.',
        'With fried bananas.',
        'With teriyaki sauce and butter.'
      ],
      correctAnswer: 'With Mayo.'
    },
    {
      question: 'What month is national pizza month?',
      answers: [
        'December',
        'October',
        'January',
        'EVERY MONTH'
      ],
      correctAnswer: 'October'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

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