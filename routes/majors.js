var express = require('express');
var router = express.Router();
var Major=require("../mongo/majors");

  //查询专业
  router.post('/majorsList', function(req, res, next) {
    Major.find({},function(err,result){
        if(err){
            res.json({success:false,msg:"查询发生错误"});
        }else{
            res.json({
              success:true,
              msg:"查询成功",
              data:{
                // total:result.length,
                list:[...result]
              },
            });
        }
    })
  });
module.exports = router;
