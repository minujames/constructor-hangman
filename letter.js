function Letter(){
  this.name = "_";
  this.filled = false;

  this.fillName = function(name){
    this.name = name;
    this.filled = true;
  };

  this.isFilled = function(){
    return this.filled;
  };

  this.toString = function(){
    return this.name;
  }
}

module.exports = Letter;