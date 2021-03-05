var express = require('express');
var router = express.Router();
var User=require("../mongo/user");

  router.get('/', function(req, res, next) {
    User.find({},function(err,result){
        if(err){
            console.log(err);
            res.json({issuccess:false,tip:"查询发生错误"});
        }else{
            res.json({
                issuccess:true,
                tip:"查询成功",
                data:result
            });
        }
        console.log('getData尝试：',result)
    })
  });

module.exports = router;
