var word = require("./Word.js");
var inquirer = require("inquirer");
var colors = require("colors");

function Hangman(){

  this.words = ["United Kingdom", "Hong Kong", "Marshall Islands", "New Zealand", "South Africa",
  "Trinidad and Tobago", "United Arab Emirates", "Costa Rica", "Dominican Republic", "Netherlands", 
  "Venezuela", "Switzerland", "India", "Philippines", "United States of America", 
  "Zimbabwe", "Thailand", "Saudi Arabia", "South Korea", "Singapore"];

  this.currentWordObj = null;
  this.remainingGuesses = 0;
  this.alreadyGuessed = [];

  this.wins = 0;
  this.losses = 0;
}

Hangman.prototype.initialize = function(){
  var currentWord = this.getNextWord();
  this.currentWordObj = new word(currentWord);

  var possibleGuessCount = currentWord.replace(/\s/g, '').length;
  possibleGuessCount = (possibleGuessCount > 10 ) ? 10 : possibleGuessCount;
  this.remainingGuesses = possibleGuessCount;
  
  this.alreadyGuessed = [];
};

Hangman.prototype.getDisplayWord = function(){
  return this.currentWordObj.getDisplayWord();
};

Hangman.prototype.getNextWord = function(){
  var random = Math.floor(Math.random() * this.words.length);
  return this.words[random];
};

Hangman.prototype.evaluateUserInput = function(guessedLetter){
  var isGameOver = false;
  var message = "";

  if(this.alreadyGuessed.includes(guessedLetter)){
    message = "\n'" + guessedLetter + "' is already guessed! [" 
      + colors.magenta.bold(this.alreadyGuessed.join(" ")) + "]\n";
  }
  else{
    this.alreadyGuessed.push(guessedLetter);
    var isMatchFound = this.currentWordObj.fill(guessedLetter);
    if(isMatchFound){
      message = "\nCORRECT!!\n".green;
      if(this.currentWordObj.isWordComplete()){
        message = "\nYou got it right!!\n".green;
        isGameOver = true;
        this.wins++;
      }
    }
    else{
      this.remainingGuesses--;
      if(this.remainingGuesses === 0){
        message = "\nSORRY!! Try Again!!\n".red;
        isGameOver = true;
        this.losses++;
      }
      else{
        message = colors.red("\nINCORRECT!! \n\nRemaining guesses: " + this.remainingGuesses + "\n");
      }
    }
  }
  return {isGameOver: isGameOver, message: message};
};

Hangman.prototype.startGame = function(){
  console.log("\n\t HANG MAN COUNTRIES!".rainbow.bold);
  console.log("\nFirst word: \n".blue);
  
  this.initialize();
  console.log(this.getDisplayWord(), "\n");
  this.playGame();
};

Hangman.prototype.playGame = function(){
  var hangman  = this;
  inquirer.prompt([
  {
    name: "letter",
    message: "Guess a letter!",
    validate: function(value) {
      var patt = new RegExp("^[A-Za-z]$");
      if (patt.test(value)) {
        return true;
      }
      return false;
    }
  }
  ]).then(function(input){
    var guessedLetter = input.letter.toLowerCase();
    var result = hangman.evaluateUserInput(guessedLetter);
    
    console.log("\n", hangman.getDisplayWord());
    console.log(result.message);

    if(result.isGameOver){
      console.log("Score", "wins:", hangman.wins, "losses:", hangman.losses, "\n"); 
      hangman.doYouWishToContinue();
    }
    else{
      hangman.playGame();
    }
  });
};

Hangman.prototype.doYouWishToContinue = function(){
  var hangman = this;
  inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Play again?"
    }
  ]).then(function(input){      
    if(input.continue){
      console.log("\nNext word! \n".blue);
      hangman.initialize();
      console.log(hangman.getDisplayWord(), "\n");
      hangman.playGame();
    }
    else{
      console.log("\nBye!! Bye!!\n".blue);
    }
  });
};

var hangman = new Hangman();
hangman.startGame();


