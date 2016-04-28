function Animal(name) {
  this.name = name;
  this.type = "animal";
  this.printName = function() {
    console.log(name);
  }
}

function Human(name) {
  this.name = name;
  this.type = "human";
  this.printName = function() {
    console.log(name);
  }
}

// Human.prototype.kind = "human";
Human.prototype = Animal;
Animal.prototype.kind = "animal";

var p1 = new Human('Byron');

// People.prototype.kind = "human2"

var a1 = new Animal('Amy');
p1.printName();
console.log('People: ' + Human.prototype);
console.log('Animal: ' + Animal.prototype);
console.log('Animal is equal to People: ' + (Animal.prototype == Human.prototype));

console.log(p1.name + ' is kind of ' + p1.kind);
console.log(a1.name + ' is kind of ' + a1.kind);
console.log(p1.type);
/*
 原型链 构造器 constructor.prototype === 对应构造器生成的对象objc.__proto__
 */
console.log(a1.__proto__ === Animal.prototype);
console.log(a1.__proto__.kind);
console.log(Human.prototype);
console.log(Human.prototype.__proto__);
console.log(Object.prototype);
console.log('!!!------------------------------------!!!');
/*
function Person(nick, age) {
  this.nick = nick;
  this.age = age;
  this.sayName = function() {
    console.log(this.nick);
  }
}
*/
function Person(nick, age) {
  this.nick = nick;
  this.age = age;
}

Person.prototype.sayName = function() {
  console.log(this.nick);
};

var p2 = new Person();
var p3 = new Person('Bryan', 45);
p2.sayName();
p3.sayName();
