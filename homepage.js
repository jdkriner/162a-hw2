//keyboard accessibility listeners
document.addEventListener("keydown", (letter) => {
  if (letter.key == "1") {
    window.location.assign("coin.html");
  }

  if (letter.key == "2") {
    window.location.assign("wordle.html");
  }

  if (letter.key == "3") {
    window.location.assign("coin2.html");
  }
});
