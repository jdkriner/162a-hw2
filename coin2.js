let probabilityInput = document.getElementById("probabilityInput");
let probabilityDisplay = document.getElementById("probabilityDisplay");

probabilityDisplay.textContent = probabilityInput.value + "%";

probabilityInput.addEventListener("input", function () {
  probabilityDisplay.textContent = this.value + "%";
});

document.addEventListener("keydown", (letter) =>{
  console.log(letter.key);
  if (letter.key == "Enter"){
    flipCoin();
  }

  if (letter.key == "0"){
    window.location.assign("homepage.html");
  }

});



function flipCoin() {
  let probability = probabilityInput.value / 100;
  let result = Math.random() < probability ? "Heads" : "Tails";
  if (result == "Heads") {
    text = document.querySelector(".resulttext")
    text.innerHTML = "<h1>Heads!</h1>";
    image = document.querySelector(".coinpic");
    image.style.backgroundImage = "url('images/heads.png')"; //source:  http://www.clker.com/clipart-361418.html
    

  } else {
    text = document.querySelector(".resulttext")
    text.innerHTML = "<h1>Tails!</h1>";
    image = document.querySelector(".coinpic");
    image.style.backgroundImage = "url('images/tails.png')";  //source: https://www.littletoncoin.com/shop/1998-s-silver-washington-quarter-pr63-438571
  }
}
