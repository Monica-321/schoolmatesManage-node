var express = require('express');
var router = express.Router();
var SchoolPost=require("../models/schoolPosts");
const util=require('../utils/index');

  //查询
  router.post('/schoolPostsList',util.ensureAuthorized, function(req, res, next) {
    console.log('schoolPostsList',req.body)
    const params={...req.body}
    delete params.pageNum
    delete params.pageSize
    let total
    SchoolPost.find({...params}).exec((err, result) => {
      if(err) {
        res.json({success:false,msg:"查询发生错误"});
      } else {
        total=result.length
        let queryResult = SchoolPost.find({...params}).limit(req.body.pageSize).skip((req.body.pageNum - 1) * req.body.pageSize);
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

    //添加
  router.post('/schoolPostsCreate', util.ensureAuthorized,function(req, res) {
    // console.log('schoolPostsCreate',req.body)
    const params={
      ...req.body
    }
    const schoolPost=new SchoolPost({...params})
    schoolPost.save(function(err,result){
      if(err){
        //TODO 具体错误 比如名字啥的重复？
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

  //编辑
  router.post('/schoolPostsUpdate',util.ensureAuthorized, function(req, res, next) {
    const {_id,title,time,address,context,method}=req.body
    SchoolPost.updateOne({_id},
      { $set:{title,time,address,context,method}},function (err, result) {
      if (err) {
        //TODO 具体错误 比如名字啥的重复？
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

  //查询详情
  router.get('/schoolPostsDetail',util.ensureAuthorized, function(req, res, next) {
    const _id=req.query._id
    SchoolPost.find({_id:_id},function (err,result){
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

  //删除
  router.post('/schoolPostsDelete',util.ensureAuthorized, function(req, res, next) {
    const {_id}=req.body
    SchoolPost.deleteOne({_id},
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

module.exports = router;
