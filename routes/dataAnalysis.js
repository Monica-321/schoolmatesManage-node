var express = require('express');
var router = express.Router();
var SchoolMate=require("../mongo/schoolMates");

//学历结构
router.get('/getEducationRate', function(req, res, next) {
  const {yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation}},
    {$group:
        {
            _id:'$educationStatus',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      var data=[]
      result.map(item => {
        data.push({name:item._id,value:item.value})
      });
      res.json({
        success:true,
        msg:"查询成功",
        data:data,
      });
    }
  })
});

//性别比例
router.get('/getGenderRate', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    // TODO 有educationStatus查出来都是空?
    {$match:{yearOfGraduation,educationStatus}},
    // {$match:{yearOfGraduation,yearOfEnrollment:{$gt:'2014'}}}, //可以查出,就这个格式
    {$group:
        {
            _id:'$gender',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      var data=[]
      result.map(item => {
        data.push({name:item._id,value:item.value})
      });
      // console.log('data',data)
      res.json({
        success:true,
        msg:"查询成功",
        data:data,
      });
    }
  })
});

//专业人数
router.get('/getMajorNum', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{educationStatus,yearOfGraduation}},
    {$group:
        {
            _id:'$major',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      // const majorMap={
      //   "dm":"数字媒体技术",
      //   "cs":"计算机科学与技术",
      //   "em":"电子信息工程",
      //   "tx":"通信工程",
      //   "ai":"电子信息科学与技术",
      //   "cat":"计算机应用技术",
      //   "sih":"信号与信息处理"
      // };
      // for (let i=0;i<result.length;i++){
      //   for(let key in majorMap){
      //     if(result[i]._id===key){
      //       result[i]._id=majorMap[key]
      //     }
      //   }
      // }
      // let obj={}
      // let majornames=[]
      // let majorvalues=[]
      // for (let i=0;i<result.length;i++){
      //   majornames.push(result[i]._id)
      //   majorvalues.push(result[i].value)
      // }
      // obj={majornames,majorvalues}
      res.json({
        success:true,
        msg:"查询成功",
        // data:obj,
        data:result
      });
    }
  })
});

//政治面貌
router.get('/getPoliticalSta', function(req, res, next) {
  // res.json({
  //   success:true,
  //   msg:"查询成功",
  //   data:{
  //     politicalnames:['中共党员', '群众','共青团员','其他'],
  //     politicalvalues:[80, 10, 115,302],
  //   }, //也有横轴显示数值的问题
  // });

  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{educationStatus,yearOfGraduation}},
    {$group:
        {
            _id:'$politicalStatus',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      res.json({
        success:true,
        msg:"查询成功",
        data:result
      });
    }
  })
});



 //毕业去向（选择）
router.get('/getGraduateOption', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation,educationStatus}},
    {$group:
        {
            _id:'$graduateChoice',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      var data=[]
      result.map(item => {
        data.push({name:item._id,value:item.value})
      });
      // console.log('data',data)
      res.json({
        success:true,
        msg:"查询成功",
        data:data,
      });
    }
  })
});

 //毕业单位行业
 router.get('/getCompanyIndus', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation,educationStatus,graduateChoice:'就业'}},
    {$group:
        {
            _id:'$workArea',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      var data=[]
      result.map(item => {
        data.push({name:item._id,value:item.value})
      });
      // console.log('data',data)
      res.json({
        success:true,
        msg:"查询成功",
        data:data,
      });
    }
  })
});

 //毕业单位规模
 router.get('/getCompanyScale', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation,educationStatus,graduateChoice:'就业'}},
    {$group:
        {
            _id:'$companySize',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      var data=[]
      result.map(item => {
        data.push({name:item._id,value:item.value})
      });
      res.json({
        success:true,
        msg:"查询成功",
        data:data,
      });
    }
  })
});

 //毕业单位排名
 router.get('/getCompanyRank', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{educationStatus,yearOfGraduation,graduateChoice:'就业'}},
    {$group:
        {
            _id:'$companyRank',
            value:{$sum:1}
        }
    }
  ],function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      res.json({
        success:true,
        msg:"查询成功",
        data:result
      });
    }
  })
});

module.exports = router;
