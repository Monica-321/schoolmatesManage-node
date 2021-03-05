var express = require('express');
var app = express();

app.get('/', function(req,res){
    res.send("node启动成功")
});

app.listen(3000, () => {
    console.log('node服务器监听3000端口成功');
})