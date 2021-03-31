
var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var majorSchema = new Schema({
    majorId:{type:String, unique: true},   //专业编号
    majorName:{type: String},    //专业名称
    majorType:{type:Number},//专业类别 0本科1硕士
    belongYear:{type:String},//所属（毕业）年份
});//限制类型
module.exports=mongoose.model('Major',majorSchema)