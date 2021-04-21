var express = require('express');
var router = express.Router();
var GraduateMedia=require("../models/graduateMedias");
const multer  = require('multer');
const path = require('path')
const fs = require('fs')
const dirPath = path.join('./public/images/graduateMedias/')

const upload = multer({storage:
    multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dirPath )
    }, filename: function (req, file, cb) {
        cb(null,Date.now() + '.' + file.originalname.split('.')[1])
    }
  })
});
const uploadSingle = upload.single('file')

  //查询各班级影像
  router.post('/getClassPics', function(req, res, next) {
    console.log('getClassPics',req.body)
    const params={...req.body}
    GraduateMedia.find({...params}).exec((err, result) => {
      if(err) {
        res.json({success:false,msg:"查询发生错误"});
      } else{
        res.json({
          success:true,
          msg:"查询成功",
          // data:{
            // total:result.length,
            data:[...result]
          // },
        });
    }
    })
  });

  //上传影像
  router.post('/graduateMediaUp',function(req, res, next){
    uploadSingle(req, res, function (err) { //上传图片操作
      if (err) {
        res.json({
          success:false,
          msg:"上传图片失败",
        })
      }else{
        const imgUrl = 'http://localhost:3000/images/graduateMedias/' + req.file.filename;
        const params={
          imgName:req.file.filename,
          imgDes:req.file.destination,
          imgSize:req.file.size,
          imgUrl,
        }
        res.json({
          success:true,
          msg:"上传成功",
          data:{...params}
        })
      }
    })
  })

  //添加（包含图片的）影像信息
  router.post('/graduateMediaAdd',function(req, res, next){
  console.log('graduateMediaAdd',req.body)
  const {yearOfGraduation,educationStatus,major,majorClass,img}=req.body
  GraduateMedia.find({yearOfGraduation,educationStatus,major,majorClass},function (err,result){
    if(err){
      res.json({
        success:false,
        msg:"查询失败",
      });
    }else{
      if(result.length<=0){
        //TODO 原来没有 是添加
        const params={...req.body}
        const graduateMedia=new GraduateMedia({...params})
        graduateMedia.save(function(err,result){
          if(err){
            console.log(err)
            res.json({success:false,msg:"添加失败"});
          }else{
            res.json({
              success:true,
              msg:"添加成功",
            });
          }
        })
        }else{
          const _id = result[0]._id
          //TODO 有，就是修改
          GraduateMedia.updateOne({_id},
            { $set:{img}},function (err, result) {
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
        }
      }
    });

  });

  // 删除图片？
router.post('/graduateMediaDelete', (req, res) => {
  const {
    _id,
    imgName
  } = req.body
  // TODO 先数据库删除该条数据，再成功后删除服务器上图片文件
  GraduateMedia.deleteOne({_id},
    function (err, result) {
    if (err) {
      //TODO 具体错误？
      console.log(err)
      res.json({success:false,msg:"删除失败"});
    } else {
      // res.json({
      //   success: true,
      //   msg: '删除成功'
      // })
      // fs.unlink(path.join(dirPath, imgName))   //这样写会有问题
      // 服务器上是否删除无所谓？暂时就不判断服务器上是否删除成功了?
      fs.unlink(path.join(dirPath, imgName), (err) => {
        if (err) {
          // TODO 删除失败原因？
          console.log(err)
          // res.json({
          //   success: false,
          //   msg: '服务器图片删除失败'
          // })
        }
        // } else {
          res.json({
            success: true,
            msg: '删除成功'
          })
        // }
      })
    }
  });
})

module.exports = router;
