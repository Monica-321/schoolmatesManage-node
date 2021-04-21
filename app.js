var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var schoolAdminRouter=require("./routes/schoolAdmins");
var schoolMateRouter=require("./routes/schoolMates");
var schoolCompanyRouter=require("./routes/schoolCompanies");
var majorRouter=require("./routes/majors");
var dataAnalyRouter=require("./routes/dataAnalysis");
var graMediaRouter=require("./routes/graduateMedia");
app.use(express.static('public'));//express.static是express提供的内置的中间件用来设置静态文件路径
app.get('/', function(req,res){
    res.send("node启动成功")
});
// 解析 application/json
app.use(bodyParser.json());	
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/schoolAdmins', schoolAdminRouter);
app.use('/api/schoolMates', schoolMateRouter);
app.use('/api/schoolCompanies', schoolCompanyRouter);
app.use('/api/majors', majorRouter);
app.use('/api/dataAnalysis', dataAnalyRouter);
app.use('/api/graduateMedia', graMediaRouter);

app.listen(3000, () => {
    console.log('node服务器监听3000端口成功');
})