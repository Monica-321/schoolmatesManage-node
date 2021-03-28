var express = require('express');
var router = express.Router();
var SchoolMate=require("../mongo/schoolMates");

  //查询校友
  router.post('/schoolMatesList', function(req, res, next) {
    SchoolMate.find({},function(err,result){
        if(err){
            res.json({success:false,msg:"查询发生错误"});
        }else{
            res.json({
              success:true,
              msg:"查询成功",
              // total:result.length(),
              data:{
                total:result.length,
                list:[...result]
              },
            });
        }
    })
  });

    //添加校友
  router.post('/schoolMatesCreate', function(req, res) {
    const data=req.body
    // console.log('添加校友的req\n',req);  //没有req.body？body-parser
    const schoolMate=new SchoolMate(data)  //实例化对象，新建数据
    schoolMate.save(function (err,ret){
      if(err){
        console.log('添加失败的err，',err);
        res.json({
          success:false,
          msg:"添加失败",
          // data:1
        });
      }
      else {
          // console.log('插入成功',ret);  //ret是成功的数据
          res.json({
            success:true,
            msg:"添加成功",
            // data:1
          });
      }
    });
  });

  //编辑校友
  router.post('/schoolMatesUpdate', function(req, res, next) {
    res.json({
      success:true,
      msg:"更新成功",
    });
  });

  //查询校友详情
  router.get('/schoolMatesDetail', function(req, res, next) {
    // const data=req.body
    // console.log('查询校友详情的req\n',req.params,req.body);
    // SchoolMate.find({},function (err,ret){ });
    res.json({
      success:true,
      msg:"查询成功",
    });
  });

  //删除校友
  router.post('/schoolMatesDelete', function(req, res, next) {
    res.json({
      success:true,
      msg:"删除成功",
    });
  });

  //批量添加？

module.exports = router;
