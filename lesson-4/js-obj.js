function People(name) {
  this.name = name;
  this.printName = function() {
    console.log(name);
  }
}

function Animal(name) {
  this.name = name;
  this.printName = function() {
    console.log(name);
  }
}

People.prototype.kind = "human";
Animal.prototype.kind = "animal";

var p1 = new People('Byron');

People.prototype.kind = "human2"

var a1 = new Animal('Amy');
p1.printName();
console.log('People: ' + People.prototype);
console.log('Animal: ' + Animal.prototype);
console.log('Animal is equal to People: ' + (Animal.prototype == People.prototype));

console.log(p1.name + ' is kind of ' + p1.kind);
console.log(a1.name + ' is kind of ' + a1.kind);
