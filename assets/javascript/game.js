function game() {
  let words = ["magic missile", "sneak attack", "constitution", "dexterity", "death saving throw", "beholder", "illithid", "mordenkainen", "perkins", "gygax", "flumph", "githyanki", "acererak", "bigby", "waterdeep", "neverwinter", "baldur's gate"];

  let secretWord = "";
  let guess = "";
  let guessedLetters = [];
  let blanksArray = [];
  let guessesLeft = 0;
  let wins = 0;
  let losses = 0;
  let wordComplete = false;



  function StartGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    guessesLeft = secretWord.length + 3;
    for (i = 0; i < secretWord.length; i++) {
      if (secretWord[i].match(/\w/)) {
        blanksArray.push("_ ");
      } else {
        blanksArray.push(secretWord[i] + " ");
      }
    }
    console.log(secretWord);
    guessedLetters = [];
    wordComplete = false;
    document.querySelector("#wordBox").innerHTML = blanksArray.join('');
  }

  document.onkeyup = function(event) {
    let guess = event.key.toLowerCase();
    if (guess === "ENTER") {
      StartGame();
      return;
    }
    if (guessesLeft <= 0 || wordComplete === true || guessedLetters.indexOf(guess) != -1) {
      return;
    }
    console.log("Guess: " + guess);
    guessedLetters.push(guess);
    if (secretWord.indexOf(guess) != -1) {



      document.querySelector('#resultsBox').innerHTML = "<h1>Congratulations!</h1>\n<h3>The letter was " + secretLetter + "</h3>\n<p>Press ENTER to play again.</p>";
      document.querySelector('#wins').innerHTML = wins;
    } else {
      document.querySelector('#resultsBox').innerHTML = "<h1>Try Again!</h1>\n<h3>The letter is still unknown.</h3>"
      document.querySelector('#guessedList').innerHTML = guessedLetters.toString();
      guessesLeft--;
      if (guessesLeft <= 0) {
        losses++;
        document.querySelector('#resultsBox').innerHTML = "<h1>I'm Sorry, you lost!</h1>\n<h3>The letter was " + secretLetter + "</h3>\n<p>Press ENTER to play again.</p>";
        document.querySelector('#losses').innerHTML = losses;
      }
      document.querySelector('#guessesLeft').innerHTML = guessesLeft;
    }
  }





  StartGame();
}

game();
