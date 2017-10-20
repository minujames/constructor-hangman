var letter = require("./letter.js");

function Word(name){
  this.name = name;
  this.letters = [];

  this.createLetters = function(){
    for(var i=0; i<name.length; i++){
      var letterObj = null;
      if(name[i] === " "){
        letterObj = new letter();
        letterObj.fillName(" ");
      }
      else{
        letterObj = new letter();
      }
      this.letters.push(letterObj);
    }
  };

  this.getDisplayWord = function(){
    return this.letters.join(" ");
  };

  this.fill = function(guessedLetter){
    var isMatchFound = false;
    var latterPattern = new RegExp(guessedLetter, "gi");

    while ((match = latterPattern.exec(this.name)) != null) {
        var matchedLetterObj = this.letters[match.index];
        matchedLetterObj.fillName(this.name[match.index]);
        isMatchFound = true;
    }
    return isMatchFound;
  };

  this.isWordComplete = function(){
    var isComplete = true;

    for(let letter of this.letters){
      if(!letter.isFilled()){
        isComplete = false;
        break;
      }
    }
    return isComplete;
  };
  
  this.createLetters();
}

module.exports = Word; 