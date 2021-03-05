
var mongoose = require('./db.js');
//加载刚才写好的数据库连接js,通过db.js连接mongodb

//mongoose中的schema是用来规范MongoDB中的表中数据
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name:{type: String},
});//限制
// var User=mongoose.model('user',userSchema)//表名User和规范UserSchema的关系绑定
// var newUser = new User({name: "Qinying"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
// newUser.save()
// module.exports=User;
module.exports=mongoose.model('User',userSchema)//表名User和规范UserSchema的关系绑定