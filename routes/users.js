var express = require('express');
var router = express.Router();
var User=require("../mongo/user");

  //参考
  // router.get('/users', function(req, res, next) {
  //   User.find({},function(err,result){
  //       if(err){
  //           console.log(err);
  //           res.json({issuccess:false,tip:"查询发生错误"});
  //       }else{
  //           res.json({
  //               issuccess:true,
  //               tip:"查询成功",
  //               data:result
  //           });
  //       }
  //       console.log('getData尝试：',result)
  //   })
  // });

  router.post('/login', function(req, res, next) {
    res.json({
      status: 10000,
      success:true,
      msg:"登录成功",
      data:{
        id: "537261339769307136",
        name: "admin2",
        username: "admin",
        phone: "13777877754",
        status: 1,
        admin: 0,
      }
    });
  });

  router.post('/logout', function(req, res, next) {
    res.json({
      status: 10000,
      success:true,
      msg:"登出成功",
      data:-1,
    });
  });

module.exports = router;
