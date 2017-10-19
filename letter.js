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
}

module.exports = Letter;