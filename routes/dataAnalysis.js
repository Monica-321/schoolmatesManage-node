var express = require('express');
var router = express.Router();
var SchoolMate=require("../models/schoolMates");
// import {mapData} from '../public/usefulData'

const mapData=[
  {
    name: "北京",
    value: 0
  },
  {
    name: "天津",
    value: 0
  },
  {
    name: "上海",
    value: 0
  },
  {
    name: "重庆",
    value: 0
  },
  {
    name: "河北省",
    value: 0
  },
  {
    name: "河南省",
    value: 0
  },
  {
    name: "云南省",
    value: 0
  },
  {
    name: "辽宁省",
    value: 0
  },
  {
    name: "黑龙江省",
    value: 0
  },
  {
    name: "湖南省",
    value: 0
  },
  {
    name: "安徽省",
    value: 0
  },
  {
    name: "山东省",
    value: 0
  },
  {
    name: "新疆维吾尔自治区",
    value: 0
  },
  {
    name: "江苏省",
    value: 0
  },
  {
    name: "浙江省",
    value: 0
  },
  {
    name: "江西省",
    value: 0
  },
  {
    name: "湖北省",
    value: 0
  },
  {
    name: "广西壮族自治区",
    value: 0
  },
  {
    name: "甘肃省",
    value: 0
  },
  {
    name: "山西省",
    value: 0
  },
  {
    name: "内蒙古自治区",
    value: 0
  },
  {
    name: "陕西省",
    value: 0
  },
  {
    name: "吉林省",
    value: 0
  },
  {
    name: "福建省",
    value: 0
  },
  {
    name: "贵州省",
    value: 0
  },
  {
    name: "广东省",
    value: 0
  },
  {
    name: "青海省",
    value: 0
  },
  {
    name: "西藏自治区",
    value: 0
  },
  {
    name: "四川省",
    value: 0
  },
  {
    name: "宁夏回族自治区",
    value: 0
  },
  {
    name: "海南省",
    value: 0
  },
  {
    name: "台湾",
    value: 0
  },
  {
    name: "香港特别行政区",
    value: 0
  },
  {
    name: "澳门特别行政区",
    value: 0
  },
  {
    name: "海外",
    value: 0
  }
];

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

//籍贯
router.get('/getHomePlace', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation,educationStatus}},
    {$group:
        {
            _id:'$homeTown',
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
      let data=[...mapData]
      data.forEach(ele=>{
        ele.value=0
      })
      result.map(item => {
        let name=item._id.split(' ')[0]
        data.forEach(ele=>{
          if (ele.name===name){
            ele.value+=item.value
          }
        })
      });
      res.json({
        success:true,
        msg:"查询成功",
        data,
      });
    }
  })
});

//生源地
router.get('/getSrcPlace', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation,educationStatus}},
    {$group:
        {
            _id:'$srcPlace',
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
      let data=[...mapData]
      data.forEach(ele=>{
        ele.value=0
      })
      result.map(item => {
        let name=item._id.split(' ')[0]
        data.forEach(ele=>{
          if (ele.name===name){
            ele.value+=item.value
          }
        })
      });
      res.json({
        success:true,
        msg:"查询成功",
        data,
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

 //毕业去向城市（不看是否就业）
 router.get('/getDstPlace', function(req, res, next) {
  const {educationStatus,yearOfGraduation}=req.query
  SchoolMate.aggregate([
    {$match:{yearOfGraduation,educationStatus}},
    {$group:
        {
            _id:'$dstPlace',
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
      let data=[...mapData]
      data.forEach(ele=>{
        ele.value=0
      })
      result.map(item => {
        let name=item._id.split(' ')[0]
        // console.log(name,item.value)
        data.forEach(ele=>{
          if (ele.name===name){
            ele.value+=item.value
          }
        })
      });
      // console.log('result,data',result,data)
      res.json({
        success:true,
        msg:"查询成功",
        data,
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
