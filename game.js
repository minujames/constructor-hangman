var word = require("./Word.js");
var inquirer = require("inquirer");

function Hangman(){

  this.words = ["United Kingdom", "Hong Kong", "Marshall Islands", "New Zealand", "South Africa",
  "Trinidad and Tobago", "United Arab Emirates", "Costa Rica", "Dominican Republic", "Netherlands", 
  "Venezuela", "Switzerland", "India", "Philippines", "United States of America", 
  "Zimbabwe", "Thailand", "Saudi Arabia", "South Korea", "Singapore"];
  this.wordsGuessed = [];

  this.incorrectGuesses = [];

  this.currentWordObj = null;

  this.remainingGuesses = 0;

  this.initialize = function(){
    var currentWord = this.getNextWord();
    console.log("current word: ", currentWord);
    this.currentWordObj = new word(currentWord);
    this.remainingGuesses = currentWord.length + 2;
  };

  this.getDisplayWord = function(){
    return this.currentWordObj.getDisplayWord();
  };

  this.getNextWord = function(){
    var random = Math.floor(Math.random() * this.words.length);
    return this.words[random];
  };

  this.evaluateUserInput = function(guessedLetter){
    var isMatchFound = this.currentWordObj.fill(guessedLetter);
    if(!isMatchFound){
      this.incorrectGuesses.push(guessedLetter);
      this.remainingGuesses--;
    }
    // return this.currentWordObj.isWordComplete()
  };

  this.getRemainingGuesses = function(){
    return this.remainingGuesses;
  };

  this.isGameOver = function(){
    if(this.remainingGuesses === 0){
      console.log("GAME OVER! No Guesses remaining");
    }
    else if(this.currentWordObj.isWordComplete()){
      console.log("GAME OVER! You won");
    }
    else{
      console.log("Game continues...");
    }
  };
}


var hangman = new Hangman();
hangman.initialize();
startGame();



function startGame(){
  console.log("\n\t HANG MAN COUNTRIES! \n\n First word: \n");
  console.log(hangman.getDisplayWord(), "\n");

  playGame();
}


function playGame(){
  
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
    var isGameOver = hangman.evaluateUserInput(guessedLetter);



    if(isGameOver){
      console.log("You got it right!");

      // add prompt ws=ish to continue

      hangman.initialize();
      console.log(hangman.getDisplayWord(), "\n");
      playGame();
    }
    else{

      playGame();
    }
  });
}








// Array.prototype.getNextWord = function(wordsGuessed){
//   if(wordsGuessed.length === this.length){
//     wordsGuessed = [];
//   }
//   var index = Math.floor(Math.random() * this.length);
//   var randomWord = this[index];
//   if(wordsGuessed.includes(randomWord)){
//     this.getNextWord(wordsGuessed);
//   }
//   else{
//     console.log("got a new word ---", randomWord);
//     wordsGuessed.push(randomWord);
//     return randomWord;
//   }
// };


