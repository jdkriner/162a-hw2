let currentGuess = 1;
const wordBank = ["fully", "chief", "voice", "empty","shape","suite", "space","usual","basic","tower","mouse","bench","fresh","rival","front","found","after","lunch","speak","steam","wrong","moral","video","thing","birth","upset","spend","robin","while","large","still","blame","cheap","serve","might","calif","river","ratio","faith","begun","watch","wound","night","scene","white","lower","dated","mount","offer","rough","occur","heavy","pound","error","cross","worth","lewis","craft","cycle","fraud","drama","train","eager","taste","equal","first","photo","hence","dealt","stone","south","sized","crowd","label","mayor","sleep","about","urban","apply","depth","eight","blind","clock","taxes","logic","pilot","crown","admit","sugar","force","apart","small","broke","earth","green","grass","japan","lease","maker","elite"];
let wordChoice;
let letterDict = {};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playagain").addEventListener("click", clearGame);
    startGame();
});

function startGame(){
    console.log("entererd startgame");

    //choose a random word from list and populate char vars and dict that will be used for validation
    //wordChoice = wordBank[Math.floor(Math.random() * 100)];
    wordChoice = "bloom";
    

    for (let i = 0; i < 5; i++){
        if (wordChoice[i] in letterDict){
            letterDict[wordChoice[i]] += 1;
        }
        else{
            letterDict[wordChoice[i]] = 1;
        }
    }

    console.log(letterDict);

    //start the game loop
    processGuess();
    console.log("after process guess");

}

function processGuess(){
    console.log("Entered processGuess");
    let currentLetter = 1;
    let guessedWord = [];


    //listen for button clicks
    document.addEventListener("keydown", (letter) =>{
        
        //grab the current row that we are on
        let containerDiv = document.getElementById(`row${currentGuess.toString()}`);
        console.log(containerDiv);

        //if a word is inputted and the player presses enter, validate the guess and move to the next row
        if (letter.key == "Enter" && currentLetter == 6){
            checkGuess(containerDiv, guessedWord);
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
            console.log(`key pressed ${letter.key}`);
            let cell = containerDiv.children[(currentLetter-1).toString()];
            //let cell = containerDiv.getElementById(currentLetter.toString());
            console.log(`cell: ${cell}`);
            cell.innerHTML = `${letter.key}`;
            guessedWord.push(letter.key);
            currentLetter++;
        }
        console.log(currentLetter);
    });

    return;
}


function checkGuess(containerDiv, guessedWord){
    let checkDict = {}

    console.log("entered checkguess");
    
    for (let i = 0; i < 5; i++){
        if (guessedWord[i] == wordChoice[i]){
            containerDiv.children[i].style.setProperty("background-color", "green");
            if (guessedWord[i] in checkDict){
                checkDict[guessedWord[i]] += 1;
            }
            else{
                checkDict[guessedWord[i]] = 1;
            }
        }
        
        else if(!(guessedWord[i] in letterDict)){
            containerDiv.children[i].style.setProperty("background-color", "grey");
        }

        else{
            if (guessedWord[i] in checkDict){
                checkDict[guessedWord[i]] += 1;
            }
            else{
                checkDict[guessedWord[i]] = 1;
            }

            if (checkDict[guessedWord[i]] <= letterDict[guessedWord[i]]){
                containerDiv.children[i].style.setProperty("background-color", "yellow");
            }
            else{
                containerDiv.children[i].style.setProperty("background-color", "grey");
            }
        }
        //containerDiv.children[i].style.setProperty("background-color", "green");
    }

    if (guessedWord.join("") == wordChoice){
        console.log("Winner");
        document.innerHTML = `You won! The word was ${wordChoice}`;
    }
    return;

}

function clearGame(){

}