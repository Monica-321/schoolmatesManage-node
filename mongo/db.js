var mongoose = require('mongoose');//加载mongoose包；

var DB_URL = 'mongodb://localhost:27017/alumni'; 
/** * 连接mongodb的字符串 */
//mongoosesample 是标识的数据库名称
mongoose.connect(DB_URL); /** *启动连接数据库 */

//监听连接成功的事件
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
}); 

/** * 连接异常 */
mongoose.connection.on('error', function (err) {

    console.log('Mongoose connection error: ' + err);
}); 

/** * 连接断开 */
mongoose.connection.on('disconnected', function () {

    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;