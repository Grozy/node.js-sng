var obj = {
  name: 'sven'
}

var A = function(){};
A.prototype = obj;
var a = new A();

console.log(obj.name);
console.log(a.name);

var B = function(){};
B.prototype = a;

var b = new B();
console.log(b.name);
console.log(b.__proto__);
