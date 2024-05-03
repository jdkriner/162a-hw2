var programming_languages = [
	"python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

// initialize variables
let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// set random word
function randomWord() {
  answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
}

// Function that dynamically makes buttons for the keyboard
function generateButtons() {
   // convert buttonsHTML string into array of individual letters
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// Function that handles the player's guesses
function handleGuess(chosenLetter) {
  // check if guessed letter is already in the guessed array
  // if not, push guessed letter to the array
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  // disable chosen letter button
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  // if the chosen letter is in answer word
  if (answer.indexOf(chosenLetter) >= 0) {
    // update guess word display
    guessedWord();
    // check if the game is won
    checkIfGameWon();
    // letter is not in the answer word
  } else if (answer.indexOf(chosenLetter) === -1) {
    // increment mistake
    mistakes++;
    // update the mistakes
    updateMistakes();
    // check if game is lost
    checkIfGameLost();
    // update the hangman picture
    updateHangmanPicture();
  }
}
// Update handman picture
function updateHangmanPicture() {
  // updates the picture according the to number of mistakes (integer) and
  // assigns the corresponding .jpg
  // ex: 2 mistakes = 2.jpg
  document.getElementById('hangmanPic').src = './hangman_images/' + mistakes + '.jpg';
}
// Check if game is won
// Check if game is won
function checkIfGameWon() {
   // if the guessed word is equal to the answer
  if (wordStatus === answer) {
    // Game is won, display winning message instead of keyboard
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

// Check if game is lost
function checkIfGameLost() {
  // if number of mistakes is equal to the number of max attempts
  if (mistakes === maxWrong) {
    // display answer
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    // display game lose message
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  // see if the guessed letter is in the answer
  // if the letter is in the answer word, keep the letter
  // otherwise, replace with "_"
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  // indicate the word status, letter or "_"
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// Updates the number of wrong guesses
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

// resets the game
function reset() {
  // reset the number of mistakes, guessed words, and the picture of hangman
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './hangman_images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();


//listen for coin flips/going back to homepage
document.addEventListener("keydown", (letter) =>{
    console.log(letter.key);
    if (letter.key == "Enter"){
      flipCoin();
    }
  
    if (letter.key == "0"){
      window.location.assign("homepage.html");
    }
  
  });
  
  