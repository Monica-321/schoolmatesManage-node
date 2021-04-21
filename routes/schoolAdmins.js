var express = require('express');
var router = express.Router();
var SchoolAdmin=require("../models/schoolAdmins");

//TODO 简易登录逻辑
  router.post('/login', function(req, res, next) {
    var loginInfo = new SchoolAdmin({
      //从前端获取数据
      username:req.body["username"],
      password:req.body["password"]
    });
    console.log('loginInfo',loginInfo)
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
    console.log('adminsList',req.body)
    const params={...req.body}
    delete params.pageNum
    delete params.pageSize
    // SchoolAdmin.find({...params}).limit(req.body.pageSize).skip((req.body.pageNum-1)*req.body.pageSize).then((res)=>{

    let total
    SchoolAdmin.find({...params}).exec((err, result) => {
      if(err) {
        res.json({success:false,msg:"查询发生错误"});
      } else {
        total=result.length
        let queryResult = SchoolAdmin.find({...params}).limit(req.body.pageSize).skip((req.body.pageNum - 1) * req.body.pageSize);
        queryResult.exec((err, result) => {
          if(err) {
            res.json({success:false,msg:"查询发生错误"});
          } else {
            res.json({
              success:true,
              msg:"查询成功",
              data:{
                total,
                list:[...result]
              },
            });
          }
        })
      }
    })
  });

  //启用/停用


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

  //个人基本信息修改
  router.post('/modifyUserInfo', function(req, res, next) {
    // TODO 没有别的前提条件等的话可以和编辑的接口合并下
    const {username,phone,email}=req.body
    SchoolAdmin.updateOne({username},
      { $set:{phone,email}},function (err, result) {
      if (err) {
        //TODO 具体错误 比如姓名啥的重复？
        console.log(err)
        res.json({success:false,msg:"更新失败"});
      } else {
        res.json({
          success:true,
          msg:"更新成功",
        });
      }
    });
  });

  //个人密码修改
  router.post('/modifyUserPwd', function(req, res, next) {
    // 先判断原密码是否相同
    const {username,oldPwd,newPwd}=req.body
    SchoolAdmin.findOne({username},function(err,result){
      if(err){
          res.json({success:false,msg:"查询发生错误"});
      }else{
        if(result.password!==oldPwd){
          res.json({success:false,msg:"原密码不正确"});
        }else{
           // 然后相同就修改成新密码
          SchoolAdmin.updateOne({username},
            { $set:{password:newPwd}},function (err, result) {
            if (err) {
              console.log(err)
              res.json({success:false,msg:"更新失败"});
            } else {
              res.json({
                success:true,
                msg:"更新成功",
              });
            }
          });
        }
      }
    })
  });

  //添加
  router.post('/adminsCreate', function(req, res, next) {
    console.log('adminsCreate',req.body)
    const params={
      password:'123456a',
      ...req.body
    }
    const schoolAdmin=new SchoolAdmin({...params})
    schoolAdmin.save(function(err,result){
      if(err){
        //TODO 具体错误 比如姓名啥的重复？
        console.log(err)
        res.json({success:false,msg:"创建失败"});
      }else{
        res.json({
          success:true,
          msg:"创建成功",
        });
      }
    })
  });

  //编辑
  router.post('/adminsUpdate', function(req, res, next) {
    const {_id,phone,email}=req.body
    // console.log('adminsUpdate',req.body)
    SchoolAdmin.updateOne({_id},
      { $set:{phone,email}},function (err, result) {
      if (err) {
        //TODO 具体错误 比如姓名啥的重复？
        console.log(err)
        res.json({success:false,msg:"更新失败"});
      } else {
        res.json({
          success:true,
          msg:"更新成功",
        });
      }
    });
  });

  //删除管理员
  router.post('/adminsDelete', function(req, res, next) {
    const {_id}=req.body
    // console.log('adminsDelete',req.body)
    SchoolAdmin.deleteOne({_id},
      function (err, result) {
      if (err) {
        //TODO 具体错误？
        console.log(err)
        res.json({success:false,msg:"删除失败"});
      } else {
        res.json({
          success:true,
          msg:"删除成功",
        });
      }
    });
  });

  //启用停用管理员
  router.get('/adminsToOnOrOff', function(req, res, next) {
    const {_id,status}=req.query
    // console.log('adminsToOnOrOff',req.body)
    SchoolAdmin.updateOne({_id},
      { $set:{status}},function (err, result) {
      if (err) {
        //TODO 具体错误？
        console.log(err)
        res.json({success:false,msg:"操作失败"});
      } else {
        res.json({
          success:true,
          msg:"操作成功",
        });
      }
    });
  });

module.exports = router;
