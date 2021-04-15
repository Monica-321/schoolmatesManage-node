
var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var schoolMateSchema = new Schema({
    id:{type:String, unique: true},//学号[入学年份+3296+【5number】]
    name:{type: String},//姓名[china foreinger]
    gender:{type:Number},//性别,0女1男[number|[0-1]]
    nationality:{type:String},//民族[56｜1]
    birthDate:{type:String},//出生日期[pincou]
    faculty:{type:String},//院系[xinxixueyuan]
    educationStatus:{type:String},//就读身份？0本科生1研究生[2|1]
    yearOfEnrollment:{type:String},//入学年份["2017","2016","2015","2014","2013"]
    yearOfGraduation:{type:String},//毕业年份["2021","2020","2019","2018","2017","2016"]
    politicalStatus:{type:String},//政治面貌[4|1]
    homeTown:{type:String},//籍贯[city]
    srcPlace:{type:String},//生源地[city]
    dstPlace:{type:String},//去向城市[city]
    major:{type:String},//专业[5|1]
    majorClass:{type:Number},//班级[3|1]
    contactPhone:{type:String},//联系手机号[number]
    contactEmail:{type:String},//联系邮箱[string]
    workArea:{type:String},//现从事行业[7｜1]
    job:{type:String},//就业岗位[20|1]
    //workCompany:{type:String},//现工作单位[]
    companyRank:{type:String},//入职公司(bat，100强，500强,其他)[1|4],
    graduateChoice:{type:String},
    salary:{type:Number},
    companySize:{type:String},
    //employWay:{type:Stirng},
});//限制类型
// var SchoolMate=mongoose.model('schoolMate',schoolMatesSchema)//表名User和规范UserSchema的关系绑定
// var newSchoolMate = new SchoolMate({name: "Qinying"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
// newSchoolMate.save()
// module.exports=newSchoolMate;
module.exports=mongoose.model('SchoolMate',schoolMateSchema)//表名User和规范UserSchema的关系绑定