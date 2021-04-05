
var mongoose = require('./db.js');

var Schema = mongoose.Schema;
var schoolAdminSchema = new Schema({
    username:{type: String, unique: true},  //用户名
    password:{type: String},    //密码
    identity:{type: Number},    //管理员身份 ：0 超级管理员 / 1普通管理员
    status:{type: Number},      //启停状态 ： 0停用1启用
    phone:{type: String, unique: true},     //手机号，可空，唯一
    email:{type: String, unique: true},     //邮箱号，可空，唯一
    permissions:{type: Array},  //菜单路由权限
});
module.exports=mongoose.model('SchoolAdmin',schoolAdminSchema)