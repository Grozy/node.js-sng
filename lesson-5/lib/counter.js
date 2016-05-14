var fs = require('fs');
var path = require('path');

module.exports = function(filePath) {
  // console.log('filePath: ' + filePath);
  if (!filePath) {
    throw new Error('缺少文件的路径');
  }
  var num = 0;
  try {
    // 检查文件是否已经被创建了
    fs.accessSync(filePath, fs.F_OK)
    // 同步读取文件内容，获取初始值
    num = parseInt(fs.readFileSync(filePath), 10);
  } catch (e) {
    console.log(e);
  }

  if (isNaN(num)) {
    num = 0;
  }

  return function *count(next){
    // console.log(this.url);
    that = this;
    // 只处理GET请求，同时除掉favicon二次请求干扰
    if ('POST' === this.method) {
      num++;
      // console.log('count :' + num);
      fs.writeFileSync(filePath, num);
    }
    this.count = num;
    yield* next;
  }
}
