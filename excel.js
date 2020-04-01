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

XLSX.writeFile(wb, output);