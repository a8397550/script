var fs = require('fs');
var path = require('path');
var loadPath;
var savePath;

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
  if (index === 2) {
    loadPath = val;
  }
  if (index === 3) {
    savePath = val;
  }
});

if (!loadPath) {
  console.log('请输入要打开的文件地址');
  return;
}

var lineStr = '';
var selectList = [];
var selectKey = '文章';

var fsRead = function (fd, buffer) {
  //每一个汉字utf8编码是3个字节，英文是1个字节
  fs.read(fd, buffer, 0, 255, null, function (err, bytesRead, buffer) {
    if(err) {
      throw err;
    } else {
      let str = '';
      if (bytesRead === 255) {
        str = buffer.toString();
        // console.log(buffer.toString());
      } else {
        str = buffer.slice(0, bytesRead).toString();
        // console.log(bytesRead);
        // console.log(buffer.slice(0, bytesRead).toString());
      }

      if (lineStr) {
        str += lineStr;
      }
      let strList;
      let isNotLine = false;

      if (!str.includes('\n')) {
        // 没有换行符号
        lineStr = str;
        isNotLine = true;
      } else if (str[str.length - 1] === '\n') {
        lineStr = '';
        // 最后一个值是换行符号
      } else {
        // 被换行父分割
        strList = str.split('\n');
        lineStr = strList[strList.length - 1]; 
      }

      let len = 0;

      if (strList) { // 被换行符分割过了。 
        len = strList.length - 1;
      } else if (!isNotLine) { // 刚好分割完
        strList = str.split('\n');
        len = strList.length;
      }

      if (strList) {
        for (let i = 0; i < strList.length - 1; i +=1) {
          const item = strList[i]
          if (item.includes(selectKey)) {
            selectList.push(item);
          }
        }
      }

      if (bytesRead === 255) {
        fsRead(fd, buffer);
      } else {
        console.log(selectList.join('\n'));
      }
    }
  });
}

if (loadPath[0] !== '/') {
  loadPath = path.join(__dirname, loadPath);
}

fs.open(loadPath, 'r', function (err, fd) {
  if(err) {
    console.error(err);
    return;
  } else {
    var buffer = Buffer.alloc(255);
    fsRead(fd, buffer);
  }
});








