let probabilityInput = document.getElementById("probabilityInput");
let probabilityDisplay = document.getElementById("probabilityDisplay");

probabilityDisplay.textContent = probabilityInput.value + "%";

probabilityInput.addEventListener("input", function () {
  probabilityDisplay.textContent = this.value + "%";
});

function flipCoin() {
  let probability = probabilityInput.value / 100;
  let result = Math.random() < probability ? "Heads" : "Tails";
  if (result == "Heads") {
    coinFlipResult.textContent = "HEADS";
  } else {
    coinFlipResult.textContent = "TAILS";
  }
}
