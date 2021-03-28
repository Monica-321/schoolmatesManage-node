var express = require('express');
var router = express.Router();
var User=require("../mongo/user");

  router.post('/login', function(req, res, next) {
    res.json({
      // status: 10000,
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
      // status: 10000,
      success:true,
      msg:"登出成功",
      data:-1,
    });
  });

    //查询管理员账户
  router.get('/adminusersQuery', function(req, res, next) {
    User.find({},function(err,result){
        if(err){
            res.json({success:false,msg:"查询发生错误"});
        }else{
            res.json({
              success:true,
              msg:"查询成功",
              data:result
            });
        }
        console.log('getData尝试：',result)
    })
  });

  //更新账户、创建、启用/停用

module.exports = router;
