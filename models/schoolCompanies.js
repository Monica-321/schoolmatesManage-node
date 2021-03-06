
var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var schoolCompanySchema = new Schema({
    // companyId:{type:String, unique: true},   //企业编号
    companyName:{type: String, unique: true},    //企业名称
    companyType:{type:Number},//企业性质
    companySize:{type:String},//企业规模
    companyCity:{type:String},//所在主要城市
    // companyPic？
    // belongArea:{type:String},//所属行业
    companyPhone:{type:String},//联系电话
    companyEmail:{type:String},//联系邮箱
    companyAddress:{type:String},//公司地址
    companyWebsite:{type:String},//企业网址
    companyDescription:{type:String},//企业描述

});//限制类型
module.exports=mongoose.model('SchoolCompany',schoolCompanySchema)