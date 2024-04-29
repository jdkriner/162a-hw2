document.addEventListener("keydown", (letter) =>{
    if (letter.key == "1"){
        window.location.assign("game1.html");
    }

    if (letter.key == "2"){
        window.location.assign("wordle.html");
    }

    if (letter.key == "3"){
        window.location.assign("game3.html");
    }

});