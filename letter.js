function Letter(){
  var name = "_";
  var filled = false;

  this.fillName = function(text){
    name = text;
    filled = true;
  };

  this.isFilled = function(){
    return filled;
  };

  this.toString = function(){
    return name;
  }
}

module.exports = Letter;