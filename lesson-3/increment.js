var program = require('./program.js');
var sum = 0;
for(var i = 0; i < 20; i++){
    sum = program.increment(sum);
}
console.log('final sum is ' + sum);
console.log(__filename + '  ' + __dirname)
console.log(exports);
console.log(require);
console.log(module);
