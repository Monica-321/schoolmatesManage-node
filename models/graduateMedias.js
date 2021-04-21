
var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var graduateMediaSchema = new Schema({
    yearOfGraduation:{type:String},//毕业年份["2021","2020","2019","2018","2017","2016"]
    educationStatus:{type:String},//就读身份？0本科生1研究生
    major:{type:String},//专业[5/2|1]
    majorClass:{type:Number},//班级[3/2|1]
    img:{type:Object},   //影像资料
});//限制类型
module.exports=mongoose.model('GraduateMedia',graduateMediaSchema)