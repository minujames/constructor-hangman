var word = require("./Word.js");
var inquirer = require("inquirer");

function Hangman(){

  this.words = ["United Kingdom", "Hong Kong", "Marshall Islands", "New Zealand", "South Africa",
  "Trinidad and Tobago", "United Arab Emirates", "Costa Rica", "Dominican Republic", "Netherlands", 
  "Venezuela", "Switzerland", "India", "Philippines", "United States of America", 
  "Zimbabwe", "Thailand", "Saudi Arabia", "South Korea", "Singapore"];
  this.wordsGuessed = [];

  this.currentWordObj = null;
  this.remainingGuesses = 0;
  this.alreadyGuessed = [];

  this.initialize = function(){
    var currentWord = this.getNextWord();
    // console.log("current word: ", currentWord);
    this.currentWordObj = new word(currentWord);

    var possibleGuessCount = currentWord.replace(/\s/g, '').length;
    possibleGuessCount = (possibleGuessCount > 10 ) ? 10 : possibleGuessCount;
    this.remainingGuesses = possibleGuessCount;
    
    this.alreadyGuessed = [];
  };

  this.getDisplayWord = function(){
    return this.currentWordObj.getDisplayWord();
  };

  this.getNextWord = function(){
    var random = Math.floor(Math.random() * this.words.length);
    return this.words[random];
  };


  this.evaluateUserInput = function(guessedLetter){
    var isGameOver = false;
    var message = "";

    if(this.alreadyGuessed.includes(guessedLetter)){
      message = "\n'" + guessedLetter + "' is already guessed!  [" 
        + this.alreadyGuessed.join(" ") + "]\n";
    }
    else{
      this.alreadyGuessed.push(guessedLetter);
      var isMatchFound = this.currentWordObj.fill(guessedLetter);
      if(isMatchFound){
        message = "\nCORRECT! \n";
        if(this.currentWordObj.isWordComplete()){
          message = "\nYou got it right! Next word!\n";
          isGameOver = true;
        }
      }
      else{
        this.remainingGuesses--;
        if(this.remainingGuesses === 0){
          message = "\nSORRY! Next word!\n";
          isGameOver = true;
        }
        else{
          message = "\nINCORRECT! \n\nRemaining guesses: " + this.remainingGuesses + "\n";
        }
      }
    }
    return {isGameOver: isGameOver, message: message};
  };

  this.startGame = function(){
    console.log("\n\t HANG MAN COUNTRIES! \n\nFirst word: \n");
    
    this.initialize();
    console.log(this.getDisplayWord(), "\n");
    this.playGame();
  };

  this.playGame = function(){
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
        // add prompt wish to continue

        hangman.initialize();
        console.log(hangman.getDisplayWord(), "\n");
      }
      hangman.playGame();
    });
  };
}


var hangman = new Hangman();
// hangman.initialize();
hangman.startGame();


