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
  const {yearOfGraduation}=req.query
  SchoolMate.aggregate([
    // TODO 有educationStatus查出来都是空？?
    {$match:{yearOfGraduation}},
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
      console.log('data',data)
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
  const {yearOfGraduation}=req.query
  SchoolMate.aggregate([
    // TODO 有educationStatus查出来都是空？?
    {$match:{yearOfGraduation}},
    // {$match:{yearOfGraduation,yearOfEnrollment:{$gt:'2014'}}}, //可以查出,就这个格式
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
      // var data=[]
      // result.map(item => {
      //   data.push({name:item._id,value:item.value})
      // });
      // console.log('data',data)
      res.json({
        success:true,
        msg:"查询成功",
        data:result,
      });
    }
  })
});

//政治面貌
router.get('/getPoliticalSta', function(req, res, next) {
  res.json({
    success:true,
    msg:"查询成功",
    data:{
      politicalnames:['中共党员', '群众','共青团员','其他'],
      politicalvalues:[80, 10, 115,302],
    },
  });
});



 //毕业去向（选择）
router.get('/getGraduateOption', function(req, res, next) {
  res.json({
    success:true,
    msg:"查询成功",
    data:[
      {value:'146',name:'就业'},
      {value:'51',name:'创业'},
      {value:'101',name:'升学'},
      {value:'31',name:'出国'},
      {value:'41',name:'其他'},
    ],
  });
});

 //毕业单位行业
 router.get('/getCompanyIndus', function(req, res, next) {
  res.json({
    success:true,
    msg:"查询成功",
    data:[
      {value:'16',name:'edu'},
      {value:'51',name:'animation'},
      {value:'101',name:'game'},
      {value:'31',name:'newMedia'},
      {value:'121',name:'internet'},
      {value:'15',name:'shop'},
      {value:'41',name:'other'},
    ],
  });
});

 //毕业单位规模
 router.get('/getCompanyScale', function(req, res, next) {
  res.json({
    success:true,
    msg:"查询成功",
    data:[
      {value:'16',name:'0-20'},
      {value:'51',name:'20-99'},
      {value:'152',name:'100-499'},
      {value:'100',name:'500-999'},
      {value:'81',name:'1000-9999'},
      {value:'15',name:'10000及以上'},
    ],
  });
});

 //毕业单位排名
 router.get('/getCompanyRank', function(req, res, next) {
  res.json({
    success:true,
    msg:"查询成功",
    data:{
      ranknames:["50强","100强","500强","其他"],
      rankvalues:[15,24,108,357],
    },
  });
});

module.exports = router;
