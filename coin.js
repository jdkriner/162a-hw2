// function randomNumberGenerator(min, max){
//     const min_num = Math.ceil(min);
//     const max_num = Math.ceil(max);
//     return Math.floor(Math.random() * (max_num - min_num) + min_num);
// }

const coinFlipButton = document.getElementById("coinFlipButton");
const coinFlipResult = document.getElementById("coinFlipResult");
const LOWER_BOUND = 1;
const UPPER_BOUND = 3;
let randomNumberGenerator;

coinFlipButton.onclick = function () {
  randomNumberGenerator = Math.floor(Math.random() * (UPPER_BOUND - LOWER_BOUND)) + LOWER_BOUND;
  if (randomNumberGenerator == 1) {
    coinFlipResult.textContent = "HEADS";
  } else {
    coinFlipResult.textContent = "TAILS";
  }
};
