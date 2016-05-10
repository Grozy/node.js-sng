var func = function(a, b, c){
  console.log('log : ' + [a, b, c]);
}

func.apply(null, [1, 2, 3]);

func.call(null, 1, 2, 3);

items = [2, 5, 6 ,7, 4];
console.log(items);
console.log(Math.max.apply(null, items));

var a = {
  length:2,
  0:'first',
  1:'second'
};

console.log(a);
console.log(Array.prototype.slice.call(a));
console.log(a.slice(0, a.length - 1));
