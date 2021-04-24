var express = require('express');
var router = express.Router();
var Major=require("../models/majors");

//专业json例子
// {
//   "majorId":"em",
//   "majorName":"电子信息工程",
//   "majorType":0,
//   "belongYear":[2017,2018,2019,2020,2021],
//   "classNum":3
// }

  //查询专业
  // router.post('/majorsList', function(req, res, next) {
  //   Major.find({},function(err,result){
  //       if(err){
  //           res.json({success:false,msg:"查询发生错误"});
  //       }else{
  //           res.json({
  //             success:true,
  //             msg:"查询成功",
  //             data:{
  //               // total:result.length,
  //               list:[...result]
  //             },
  //           });
  //       }
  //   })
  // });
module.exports = router;
