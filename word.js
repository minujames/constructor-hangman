var letter = require("./letter.js");

function Word(text){
  this.name = text;
  this.letters = [];
 
  this.createLetters();
}

Word.prototype.createLetters = function(){
  for(var i=0; i<this.name.length; i++){
    var letterObj = null;
    if(this.name[i] === " "){
      letterObj = new letter();
      letterObj.fillName(" ");
    }
    else{
      letterObj = new letter();
    }
    this.letters.push(letterObj);
  }
};

Word.prototype.getDisplayWord = function(){
  return this.letters.join(" ");
};

Word.prototype.fill = function(guessedLetter){
  var isMatchFound = false;
  var latterPattern = new RegExp(guessedLetter, "gi");

  while ((match = latterPattern.exec(this.name)) != null) {
      var matchedLetterObj = this.letters[match.index];
      matchedLetterObj.fillName(this.name[match.index]);
      isMatchFound = true;
  }
  return isMatchFound;
};

Word.prototype.isWordComplete = function(){
  var isComplete = true;

  for(let letter of this.letters){
    if(!letter.isFilled()){
      isComplete = false;
      break;
    }
  }
  return isComplete;
};

module.exports = Word; 