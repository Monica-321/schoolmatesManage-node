// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var apiRouter=require("./routes/api");

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// //设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   next();
// });

// app.use('/', indexRouter);
// app.use('/api', apiRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var schoolAdminRouter=require("./routes/schoolAdmins");
var schoolMateRouter=require("./routes/schoolMates");
// var schoolCompanyRouter=require("./routes/schoolCompanies");
var majorRouter=require("./routes/majors");

app.get('/', function(req,res){
    res.send("node启动成功")
});
// 解析 application/json
app.use(bodyParser.json());	
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/schoolAdmins', schoolAdminRouter);
app.use('/api/schoolMates', schoolMateRouter);
// app.use('/api/schoolCompanies', schoolCompanyRouter);
app.use('/api/majors', majorRouter);

app.listen(3000, () => {
    console.log('node服务器监听3000端口成功');
})