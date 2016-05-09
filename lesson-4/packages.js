// (function(){})();  //立即执行函数
var myObject = (function(){
  var __name = 'sven';
  // console.log(__name); //因为是立即执行函数，此语句会立即执行，本部分相当于直接构造并实例化myObject
  return {
    getName: function(){
      return __name;
    }
  }
})();

// console.log(myObject.getName());
// console.log(myObject.__name);

// var func1 = function(){
//   console.log('func1');
// };
//
// var func2 = (function(){
//   console.log('func2');
// })();

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

var a = new Person('sevn');

var objectFactory = function(){
  var obj = new Object(),

  args = [].slice.call(arguments);
  var undif = [].shift;

  var Constructor = arguments[0];//undif.call(arguments);//shift

  console.log(typeof(arguments) + '   ' + typeof([]));
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object'? ret: obj;
}

var b = objectFactory(Person, 'sven');
