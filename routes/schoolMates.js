var express = require('express');
var router = express.Router();
var SchoolMate=require("../models/schoolMates");
const util=require('../utils/index');

  //查询校友
  router.post('/schoolMatesList',util.ensureAuthorized, function(req, res, next) {
    console.log('schoolMatesList',req.body)
    const params={...req.body}
    delete params.pageNum
    delete params.pageSize
    let total
    SchoolMate.find({...params}).exec((err, result) => {
      if(err) {
        res.json({success:false,msg:"查询发生错误"});
      } else {
        total=result.length
        let queryResult = SchoolMate.find({...params}).limit(req.body.pageSize).skip((req.body.pageNum - 1) * req.body.pageSize);
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

  //检查学号
  router.get('/schoolMatesIdCheck',util.ensureAuthorized, function(req, res, next) {
    const id=req.query.id
    console.log('schoolMatesIdCheck',req.query)
    SchoolMate.find({id:id},function (err,result){
      if(err){
        res.json({
          success:false,
          msg:"查询失败",
        });
      }else{
        if(result.length<=0){
          res.json({
            success:true,
            msg:"目前没有该学号！",
          });
        }else{
          res.json({
            success:false,
            msg:"该学号已存在",
          });
        }
      }
    });
  });

    //添加校友
  router.post('/schoolMatesCreate',util.ensureAuthorized, function(req, res) {
    // console.log('schoolMatesCreate',req.body);  //没有req.body？body-parser
    const params={
      ...req.body
    }
    const schoolMate=new SchoolMate({...params})  //实例化对象，新建数据
    schoolMate.save(function (err,ret){
      if(err){
        // console.log('添加失败的err，',err);
        //TODO 具体错误？
        res.json({
          success:false,
          msg:"添加失败",
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
  router.post('/schoolMatesUpdate',util.ensureAuthorized, function(req, res, next) {
    const {id,name,gender,nationality,birthDate,faculty,educationStatus,politicalStatus,
      homeTown,srcPlace,dstPlace,yearOfEnrollment,yearOfGraduation,major,majorClass,graduateChoice,
      contactPhone,contactEmail,contactAddress,workArea,job,companyRank,companySize,salary}=req.body
    SchoolMate.updateOne({id},
      { $set:{name,gender,nationality,birthDate,faculty,educationStatus,politicalStatus,
        homeTown,srcPlace,dstPlace,yearOfEnrollment,yearOfGraduation,major,majorClass,graduateChoice,
        contactPhone,contactEmail,contactAddress,workArea,job,companyRank,companySize,salary}},function (err, result) {
      if (err) {
        //TODO 具体错误？
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

  //查询校友详情
  router.get('/schoolMatesDetail',util.ensureAuthorized, function(req, res, next) {
    const id=req.query.id
    // console.log('查询校友详情的req\n',req.query,id);
    SchoolMate.find({id:id},function (err,result){
      // console.log(err,result)
      if(err){
        res.json({
          success:false,
          msg:"查询失败",
        });
      }else{
        if(result.length<=0){
          res.json({
            success:false,
            msg:"没有该学号的数据！",
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

  //删除校友
  router.post('/schoolMatesDelete',util.ensureAuthorized, function(req, res, next) {
    const {id}=req.body
    SchoolMate.deleteOne({id},
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
  router.post('/matesBatchCreation',util.ensureAuthorized, function(req, res) {
    console.log('matesBatchCreation',req.body);  //没有req.body？body-parser
    const params=[
      ...req.body
    ]
    //先每条查是否有重复，有则直接返回失败(说哪几条重复)，一条都没有重复则进行下一步统一添加去重复数据
    // let arr=JSON.parse(JSON.stringify(params))
    // //查询重复学号
    // params.map((item,index)=>{
    //   SchoolMate.find({id:item.id},function (err,result){
    //     console.log('result\n',result,result.length)
    //     if(result.length>0){
    //       arr.splice(index,1)  //有问题
    //     }
    //   })
    // })
    // console.log("arr\n",arr)

    //没有重复学号的添加进去(先直接添加，失败返回)
    SchoolMate.insertMany(params,function (err,ret){
      if(err){
        console.log('添加失败的err，',err);
        //TODO 具体错误？
        res.json({
          success:false,
          msg:"有数据添加失败！请检查学号是否重复",
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


module.exports = router;
