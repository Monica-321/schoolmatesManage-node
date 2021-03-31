
var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var schoolMateSchema = new Schema({
    id:{type:String, unique: true},   //学号
    name:{type: String},    //姓名
    gender:{type:Number},//性别,0女1男
    nationality:{type:String},//民族
    birthDate:{type:String},//出生日期
    faculty:{type:String},//院系？
    educationStatus:{type:Number},//就读身份？0本科生1研究生
    yearOfEnrollment:{type:String},//入学年份
    yearOfGraduation:{type:String},//毕业年份
    politicalStatus:{type:String},//政治面貌
    homeTown:{type:String},//籍贯
    sourcePlace:{type:String},//生源地
    major:{type:String},//专业
    majorClass:{type:Number},//班级
    contactPhone:{type:String},//联系手机号
    contactEmail:{type:String},//联系邮箱
    contactAddress:{type:String},//通讯地址
    workArea:{type:String},//现从事行业
    workCompany:{type:String},//现工作单位？

});//限制类型
// var SchoolMate=mongoose.model('schoolMate',schoolMatesSchema)//表名User和规范UserSchema的关系绑定
// var newSchoolMate = new SchoolMate({name: "Qinying"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
// newSchoolMate.save()
// module.exports=newSchoolMate;
module.exports=mongoose.model('SchoolMate',schoolMateSchema)//表名User和规范UserSchema的关系绑定