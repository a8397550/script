const XLSX = require('xlsx');
const output = './output1.xlsx';

function read() {
  let filename = './output.xlsx';

  process.argv.forEach((val, index) => {
    // console.log(`${index}: ${val}`);
    if (index === 2) {
      filename = val;
    }

    if (index === 3) {
      output = val;
    }
  
  });
  
  const workbook = XLSX.readFile(filename);
  // 获取 Excel 中所有表名
  var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2',……]
  // 根据表名获取对应某张表
  var worksheet = workbook.Sheets[sheetNames[0]];
  // 将表转换为json
  var workjson = XLSX.utils.sheet_to_json(worksheet);

  return workjson;
}

var json = [{key: 'aaa', value: 'bbb'}] || read();

var workbook2 = XLSX.utils.json_to_sheet(json);

// 构建 workbook 对象
var wb = {
  SheetNames: ['mySheet'],
  Sheets: {
      'mySheet': workbook2
  }
};

const s2ab = function (s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);

      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;

      return buf;
};

const wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
const wbout = XLSX.write(wb, wopts);
const buffer = Buffer.from(s2ab(wbout));
const blob = new Blob([buffer], {type: 'application/vnd.ms-excel'});
const myFile = new File([blob], filename + '.xls');


XLSX.writeFile(wb, output);
