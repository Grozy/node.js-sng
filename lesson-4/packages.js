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

console.log(myObject.getName());
console.log(myObject.__name);

var func1 = function(){
  console.log('func1');
};

var func2 = (function(){
  console.log('func2');
})();

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

var a = new Person('sevn');

console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);

var objectFactory = function(){
  var obj = new Object(),
  Constructor = [].shift.call(arguments),
  args = [].slice.call(arguments);
  console.log('....' + arguments + '...' + [].shift);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object'? ret: obj;
}

var b = objectFactory(Person, 'sven');

console.log(b.name);
console.log(b.getName());
console.log(Object.getPrototypeOf(b) === Person.prototype);
console.log(Object.getOwnPropertyNames(Person));

var tester = function (a, b, c){
   console.log({
    this: this,
    a: a,
    b: b,
    c: c
  });
 };
 tester('a: Person','b');
