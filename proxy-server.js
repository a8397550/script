const express = require("express");
const axios = require("axios");
const qs = require("querystring");
const app = express();

const port = 3000;
const url = 'http://baidu.com';


app.all('*', function(req, res) {
    let {url: path} = req;

    path = path.split("?")[0];
    axios({
      methed: req.methed,
      url: `${url}${path}`,
      data: req.data,
      params: req.query,
    }).then((resData) => {
        console.log(resData.data);
        res.send(resData.data);
    }, (err)=>{
        console.log(err);
        res.send(err);
    })
});

app.listen(port, () => console.log(`服务已启动，端口${port}`))
