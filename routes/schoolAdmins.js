var express = require('express');
var router = express.Router();
var SchoolAdmin=require("../mongo/schoolAdmins");

//TODO 简易登录逻辑
  router.post('/login', function(req, res, next) {
    var loginInfo = new SchoolAdmin({
      //从前端获取数据
      username:req.body["username"],
      password:req.body["password"]
    });
    SchoolAdmin.find({username:loginInfo.username},function(err,result){
      if(err){
          res.json({success:false,msg:"查询发生错误"});
      }else{
        //查了没有该用户
        if(result.length<=0){
          res.json({success:false,msg:"用户不存在"});
        }else{
          let user=result[0]
          //有但是密码不匹配
          if(user.password!==loginInfo.password){
            res.json({success:false,msg:"用户名与密码不匹配"});
          }else{
            if(user.status){
              res.json({
                success:true,
                msg:"登录成功",
                data:user
              });
            }else{//用户停用
              res.json({success:false,msg:"该账户已停用"});
            }
          }
        }
      }
    })
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
  router.post('/adminsList', function(req, res, next) {
    SchoolAdmin.find({},function(err,result){
        if(err){
            res.json({success:false,msg:"查询发生错误"});
        }else{
            res.json({
              success:true,
              msg:"查询成功",
              data:{
                total:result.length,
                list:[...result]
              },
            });
        }
    })
  });

  //更新账户、创建、启用/停用


  //个人基本信息查询
  router.post('/getUserInfo',function(req, res, next){
    var loginInfo = new SchoolAdmin({
      //从前端获取数据
      username:req.body["username"],
      // password:req.body["password"]
    });
    SchoolAdmin.find({username:loginInfo.username},function(err,result){
      if(err){
          res.json({success:false,msg:"查询发生错误"});
      }else{
        //查了没有该用户
        if(result.length<=0){
          res.json({success:false,msg:"用户不存在"});
        }else{
          let {username , identity , status , phone , email }=result[0]
          if(status){
            res.json({
              success:true,
              msg:"查询成功",
              data:{
                username,
                identity,
                status,
                phone,
                email,
              }
            });
          }else{//用户停用
            res.json({success:false,msg:"该账户已停用，无法进行操作"});
          }
        }
      }
    });
  });

  //添加
  router.post('/adminsCreate', function(req, res, next) {
    res.json({
      success:true,
      msg:"创建成功",
    });
  });

  //编辑
  router.post('/adminsUpdate', function(req, res, next) {
    res.json({
      success:true,
      msg:"编辑成功",
    });
  });

  //删除管理员
  router.post('/adminsDelete', function(req, res, next) {
    res.json({
      success:true,
      msg:"删除成功",
    });
  });

  //启用停用管理员
  router.get('/adminsToOnOrOff', function(req, res, next) {
    res.json({
      success:true,
      msg:"启/停用成功",
    });
  });

module.exports = router;
