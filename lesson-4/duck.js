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
/*
// code 2
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
*/
/*
// code 1.2.3
var makeSound = function(animal){
  animal.sound();
};

var Duck = function(){};

Duck.prototype.sound = function(){
  console.log('嘎嘎嘎');
};

var Chicken = function(){};

Chicken.prototype.sound = function(){
  console.log('咯咯咯');
};

var Doggy = function(){};

Doggy.prototype.sound = function () {
  console.log('汪汪汪');
};

makeSound(new Duck());
makeSound(new Chicken());
makeSound(new Doggy());
*/

var googleMap = {
  show: function(){
    console.log('开始渲染谷歌地图');
  }
}

/*
var renderMap = function(){
  googleMap.show();
}
*/

// 将谷歌地图改成百度地图
var baiduMap = {
  show: function(){
    console.log('开始渲染百度地图');
  }
}
/*
// 根据type选择调用方案
var renderMap = function(type){
  if (type === 'google') {
    googleMap.show();
  } else if ( type === 'baidu') {
    baiduMap.show();
  }
}
renderMap('baidu');
// renderMap('google');
*/

var renderMap = function(map) {
  if (map.show instanceof Function) {
    map.show()
  }
}

renderMap(baiduMap);
// renderMap(googleMap);
// 新增soso地图
// var sosoMap = {
//   show: function(){
//     console.log('开始渲染搜搜地图');
//   }
// }
// renderMap(sosoMap);
