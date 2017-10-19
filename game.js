var word = require("./Word.js");

function Hangman(){

  this.words = ["United Kingdom", "Hong Kong", "Marshall Islands", "New Zealand", "South Africa",
  "Trinidad and Tobago", "Anited Arab Emirates", "Costa Rica", "Dominican Republic", "Netherlands", 
  "Venezuela", "Switzerland", "India", "Philippines", "United States of America", 
  "Zimbabwe", "Thailand", "Saudi Arabia", "South Korea", "Singapore"];
  this.wordsGuessed = [];

  // this.currentWord = null;

  this.initialize = function(){
    var currentWord = this.getNextWord();
    console.log("current word: ", currentWord);
    var wordObj = new word(currentWord);
  };

  this.getNextWord = function(){
    var random = Math.floor(Math.random() * this.words.length);
    return this.words[random];
  };

}


var hangman = new Hangman();
hangman.initialize();

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


