var express = require('express');
var router = express.Router();
var SchoolCompany=require("../mongo/schoolCompanies");

  //查询校友企业
  router.post('/schoolCompaniesList', function(req, res, next) {
    SchoolCompany.find({},function(err,result){
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

    //添加校友企业
  router.post('/schoolCompaniesCreate', function(req, res) {
    const data=req.body
    // console.log('添加校友的req\n',req);  //没有req.body？body-parser
    const schoolCompany=new SchoolCompany(data)  //实例化对象，新建数据
    schoolCompany.save(function (err,ret){
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

  //编辑校友企业
  router.post('/schoolCompaniesUpdate', function(req, res, next) {
    res.json({
      success:true,
      msg:"更新成功",
    });
  });

  //查询校友企业详情
  router.get('/schoolCompaniesDetail', function(req, res, next) {
    const _id=req.query._id
    SchoolCompany.find({_id:_id},function (err,result){
      if(err){
        res.json({
          success:false,
          msg:"查询失败",
        });
      }else{
        if(result.length<=0){
          res.json({
            success:false,
            msg:"没有该数据！",
          });
        }else{
          res.json({
            success:true,
            msg:"查询成功",
            data:result[0],
          });
        }
      }
    });
  });

  //删除校友企业
  router.post('/schoolCompaniesDelete', function(req, res, next) {
    res.json({
      success:true,
      msg:"删除成功",
    });
  });

  //批量添加？

module.exports = router;
