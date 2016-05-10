var A = function(name){
  this.name = name;
}

var B = function(){
  A.apply(this, arguments);
}

B.prototype.getName = function () {
  return this.name;
};

var b = new B('Duwn', '2');
console.log(b.name);

var c = (function(){
  console.log(arguments);
  Array.prototype.push.call( arguments, 3 );
   console.log ( arguments ); // 􏵂􏳗[1,2,3]
   return arguments;
})(1,2);

console.log(c);

var a = {}
Array.prototype.push.call(a, 'first');
console.log(a.length);
console.log(a);
