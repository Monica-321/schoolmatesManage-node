var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var schoolPostSchema=new Schema({
    title:{type:String, unique: true},//公告标题
    time:{type:String},//活动时间
    address:{type:String},//活动地址
    context:{type:String},//活动正文
    method:{type:String}//参与方式
  });
module.exports=mongoose.model('SchoolPost',schoolPostSchema)