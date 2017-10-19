var letter = require("./letter.js");

function Word(name){
  this.name = name;
  this.letters = [];

  this.createLetters = function(){
    console.log("constructing letter array....");
    for(var i=0; i<name.length; i++){
      var letterObj = null;
      if(name[i] === " "){
        console.log("space character");
        letterObj = new letter();
        letterObj.fillName(" ");
      }
      else{
        letterObj = new letter();
      }
      this.letters.push(letterObj);
    }
    console.log(this.letters);
  };

  this.createLetters();
}


module.exports = Word; 