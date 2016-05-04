/*
// code 1
var duck = {
  duckSinging: function(){
    console.log('嘎嘎嘎');
  }
}

var chicken = {
  duckSinging: function(){
    console.log('嘎嘎嘎');
  }
}

var doggy = {
  duckSinging: function(){
    console.log('嘎嘎嘎');
  }
}

var choir = [];

var joinChoir = function(animal) {
  if (animal && typeof animal.duckSinging === 'function') {
    choir.push(animal);
    console.log('恭喜加入合唱团');
    console.log('合唱团已有成员数量:' + choir.length);
  }
}

joinChoir(duck);
joinChoir(chicken);
joinChoir(doggy);
*/

var makeSound = function(animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  }
}

var Duck = function(){};
var Chicken = function(){};

makeSound(new Duck());
makeSound(new Chicken());
