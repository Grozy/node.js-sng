//  1、作为对象的方法调用
var obj = {
  a: 1,
  getA: function(){
    console.log(this == obj);
    console.log(this.a);
  },
  getB: function(){
    this.getA();
  }
}
console.log('作为对象的方法调用打印:');
obj.getA();
obj.getB();

// 2、作为普通函数调用 this === window
/*
window.name = 'global Name';
var getName = function () {
  return this.name;
}

console.log(getName());
*/

// 3、构造器调用
var myClass = function(){
  this.name = 'sven';
}

var obj = new myClass();
console.log('构造器调用打印:' + obj.name);

var otherClass = function(){
  this.name = 'sven';
  this.age = 25;
  return {
    name: 'anne',
    age: 18
  }
};
var obj2 = new otherClass();
console.log(obj2.name);
console.log(obj2.age);

var MyClass = function(){
  this.name = 'sven';
  return 'anne';
}

var obj3 = new MyClass();
console.log(obj3);
console.log(MyClass());

// 4、Function.prototype.call 或 Function.prototype.apply
var obj4 = {
  name: 'sven',
  getName: function(){
    return this.name;
  }
}, obj5 = {
  name: 'anne'
};

console.log(obj4.getName());
console.log(obj4.getName.call(obj5));

var obj6 = {
  myName: 'sven',
  getName: function(){
    return this.myName;
} };
console.log(obj6.getName());
var getName2 = obj6.getName;
console.log(getName2());
// 􏵂􏳗􏰢'sven' // 􏵂􏳗􏰢undefined
