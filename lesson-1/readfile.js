var fs = require('fs');
fs.readFile('/index.html', function(err, file){
    console.log('读取文件完成');
    console.log(file);
});
console.log('发起读取文件');
