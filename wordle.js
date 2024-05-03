let currentGuess = 1;
const wordBank = ["fully", "chief", "voice", "empty","shape","suite", "space","usual","basic","tower","mouse","bench","fresh","rival","front","found","after","lunch","speak","steam","wrong","moral","video","thing","birth","upset","spend","robin","while","large","still","blame","cheap","serve","might","calif","river","ratio","faith","begun","watch","wound","night","scene","white","lower","dated","mount","offer","rough","occur","heavy","pound","error","cross","worth","lewis","craft","cycle","fraud","drama","train","eager","taste","equal","first","photo","hence","dealt","stone","south","sized","crowd","label","mayor","sleep","about","urban","apply","depth","eight","blind","clock","taxes","logic","pilot","crown","admit","sugar","force","apart","small","broke","earth","green","grass","japan","lease","maker","elite"];
let wordChoice;
let letterDict = {};

//initiate the game loop on page load
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});


//this function chooses a random word from tbe word list and populates the wordChoice and letterDict globals 
//for verifciation later
function startGame(){
    wordChoice = wordBank[Math.floor(Math.random() * 100)];
    for (let i = 0; i < 5; i++){
        if (wordChoice[i] in letterDict){
            letterDict[wordChoice[i]] += 1;
        }
        else{
            letterDict[wordChoice[i]] = 1;
        }
    }
    //start the game loop
    processGuess();

}

function processGuess(){
    let currentLetter = 1;
    let guessedWord = [];


    //listen for button clicks
    document.addEventListener("keydown", (letter) =>{
        
        //grab the current row that we are on
        let containerDiv = document.getElementById(`row${currentGuess.toString()}`);
        console.log(currentGuess);

        //if a word is inputted and the player presses enter, validate the guess and move to the next row
        if (letter.key == "Enter" && currentLetter == 6){
            checkGuess(containerDiv, guessedWord, currentGuess);
            currentGuess++;
            currentLetter = 1;
            guessedWord = [];
            return;
        }

        //let a player delete a letter
        else if (letter.key == "Backspace" && currentLetter > 1){
            currentLetter--;
            let cell = containerDiv.children[(currentLetter-1).toString()];
            guessedWord.pop();
            cell.innerHTML = "";
        }

        //when a valid letter is entered place it in the box
        else if (letter.key >= "a" && letter.key <= "z" && currentLetter < 6){
            let cell = containerDiv.children[(currentLetter-1).toString()];
            cell.innerHTML = `${letter.key}`;
            guessedWord.push(letter.key);
            currentLetter++;
        }

        //return the user to the homepage if they press 0
        else if (letter.key == "0"){
            window.location.assign("homepage.html");
        }
    });

    return;
}


function checkGuess(containerDiv, guessedWord, currentGuess){
    let checkDict = {}

    //if the letter is in the right spot, make the cell background green, and index it in checkDict, 
    //which will be used for verification    
    for (let i = 0; i < 5; i++){
        if (guessedWord[i] == wordChoice[i]){
            containerDiv.children[i].style.setProperty("background-color", "darkgreen");
            if (guessedWord[i] in checkDict){
                checkDict[guessedWord[i]] += 1;
            }
            else{
                checkDict[guessedWord[i]] = 1;
            }
        }
        
        //if the letter is not in the word, make the background grey
        else if(!(guessedWord[i] in letterDict)){
            containerDiv.children[i].style.setProperty("background-color", "grey");
        }
    }

    //if the letter is in the word and already in the current guess, color appropriately
    //this is done in a separate loop because the logic with multiple of the same character gets messy
    for (let i = 0; i < 5; i++){

        //if the letter is in the word, but not in the right spot, figure out the yellow/grey lofgic
        if (guessedWord[i] != wordChoice[i] && guessedWord[i] in letterDict){
            if (guessedWord[i] in checkDict){
                checkDict[guessedWord[i]] += 1;
            }
            else{
                checkDict[guessedWord[i]] = 1;
            }

            //color the letter appropriately depending on the number of that letter already inputted
            if (checkDict[guessedWord[i]] <= letterDict[guessedWord[i]]){
                containerDiv.children[i].style.setProperty("background-color", "yellow");
            }
            else{
                containerDiv.children[i].style.setProperty("background-color", "grey");
            }
        }
    }

    //check for win
    if (guessedWord.join("") == wordChoice){
        setTimeout(wonGame, 1000);
    }

    //check for loss
    if (guessedWord.join("") != wordChoice && currentGuess >= 6){
        setTimeout(lostGame, 1000);
    }
    return;

}

//quick func for wins
function wonGame(){
    resText = document.querySelector(".result");
    resText.innerHTML = "<h2>You Won!</h2>";
    resText.style.display = "block";
    setTimeout(restartGame, 2000);
}

//quick func for losses
function lostGame(){ 
    resText = document.querySelector(".result");
    resText.innerHTML = `<h2>Better Luck Next Time!</h2>
                         <h3>The Word Was ${wordChoice}</h3>`;
    resText.style.display = "block";
    setTimeout(restartGame, 2000);
}

function restartGame(){
    location.reload();
}