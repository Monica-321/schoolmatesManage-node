var express = require('express');
var router = express.Router();
var SchoolCompany=require("../models/schoolCompanies");

  //查询校友企业
  router.post('/schoolCompaniesList', function(req, res, next) {
    console.log('schoolCompaniesList',req.body)
    const params={...req.body}
    delete params.pageNum
    delete params.pageSize
    let total
    SchoolCompany.find({...params}).exec((err, result) => {
      if(err) {
        res.json({success:false,msg:"查询发生错误"});
      } else {
        total=result.length
        let queryResult = SchoolCompany.find({...params}).limit(req.body.pageSize).skip((req.body.pageNum - 1) * req.body.pageSize);
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

    //添加校友企业
  router.post('/schoolCompaniesCreate', function(req, res) {
    console.log('schoolCompaniesCreate',req.body)
    const params={
      ...req.body
    }
    const schoolCompany=new SchoolCompany({...params})
    schoolCompany.save(function(err,result){
      if(err){
        //TODO 具体错误 比如姓名啥的重复？
        console.log(err)
        res.json({success:false,msg:"添加失败"});
      }else{
        res.json({
          success:true,
          msg:"添加成功",
        });
      }
    })
  });

  //编辑校友企业
  router.post('/schoolCompaniesUpdate', function(req, res, next) {
    const {_id,companyName,companyType,companySize,companyCity,companyAddress,companyWebsite,companyPhone,companyEmail,companyDescription}=req.body
    SchoolCompany.updateOne({_id},
      { $set:{companyName,companyType,companySize,companyCity,companyAddress,companyWebsite,companyPhone,companyEmail,companyDescription}},function (err, result) {
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
    const {_id}=req.body
    SchoolCompany.deleteOne({_id},
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

  //批量添加？

module.exports = router;
