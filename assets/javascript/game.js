function game() {
  let words = ["MAGIC MISSILE", "SNEAK ATTACK", "CONSTITUTION", "DEXTERITY", "DEATH SAVING THROW", "BEHOLDER", "ILLITHID", "MORDENKAINEN", "CHRIS PERKINS", "GYGAX", "FLUMPH", "GITHYANKI", "ACERERAK", "BIGBY'S HAND", "WATERDEEP", "NEVERWINTER", "BALDUR'S GATE"];

  let secretWord = "";
  let guess = "";
  let guessedLetters = [];
  let blanksArray = [];
  let guessesLeft = 0;
  let wins = 0;
  let losses = 0;
  let wordComplete = false;
  let alphaRe = /[a-z]/i;
  let numRe = /[\d]/;

  function StartGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    blanksArray = []
    guessesLeft = secretWord.length + 3;
    for (i = 0; i < secretWord.length; i++) {
      if (alphaRe.test(secretWord[i]) === true) {
        blanksArray.push("_ ");
      } else if (secretWord[i] === " ") {
        blanksArray.push("&nbsp; ");
      } else {
        blanksArray.push(secretWord[i] + " ");
      }
      document.querySelector("#resultsBox").innerHTML = "";
    }
    console.log("SecretWord: " + secretWord);
    guessedLetters = [];
    wordComplete = false;
    document.querySelector("#wordBox").innerHTML = blanksArray.join('');
    document.querySelector('#guessedList').innerHTML = guessedLetters.toString();
    document.querySelector('#guessesLeft').innerHTML = guessesLeft;

  }

  function WinGame() {
    wins++;
    document.querySelector('#resultsBox').innerHTML = "<h1>Congratulations!</h1>\n<h3>The word was " + secretWord + "</h3>\n<p>Press ENTER to play again.</p>";
    document.querySelector('#wins').innerHTML = wins;
  }

  function LoseGame() {
    losses++;
    document.querySelector('#resultsBox').innerHTML = "<h1>I'm Sorry, you lost!</h1>\n<h3>The word was " + secretWord + "</h3>\n<p>Press ENTER to play again.</p>";
    document.querySelector('#losses').innerHTML = losses;
  }

  document.onkeyup = function(event) {
    let guess = event.key.toUpperCase();
    if (guess === "ENTER" && (guessesLeft <= 0 || wordComplete === true)) {
      StartGame();
      return;
    }
    if (alphaRe.test(guess) === false || numRe.test(guess) === true) {
      alert("What kind of trickery are you trying to pull? That's not a letter!")
      return;
    }
    if (guessesLeft <= 0 || wordComplete === true || guessedLetters.indexOf(guess) != -1) {
      return;
    }
    guessedLetters.push(guess);
    console.log("Guess: " + guess);

    guessesLeft--;
    document.querySelector('#guessesLeft').innerHTML = guessesLeft;
    document.querySelector('#guessedList').innerHTML = guessedLetters.toString();

    if (RegExp(guess).test(secretWord)) {
      secretWord.split('').forEach(function(elt, i) {
        if (elt === guess) {
          blanksArray[i] = guess;
          document.querySelector("#wordBox").innerHTML = blanksArray.join('');
        }
      });
      if (RegExp('_').test(blanksArray.join('')) === false) {
        wordComplete = true;
        WinGame()
        return;
      }
    }
    if (guessesLeft <= 0) {
      LoseGame();
      return;
    }
  }

  StartGame();
}

game();
