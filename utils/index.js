const jwt = require('jsonwebtoken')

ensureAuthorized=async(req,res,next)=>{
    // 检查post信息及url查询参数或头信息
    var token=req.body.token || req.query.token ||req.headers["token"];
    // 加密解密公私钥？
    let publicKey="secret12345"
    if(token){
        jwt.verify( token, publicKey, (error,decoded)=>{
            if(error){
                console.log("error",error)
                if(error.name==="TokenExpiredError"){
                    return res.json({
                        success:false,
                        code:-1,
                        msg:"token信息已过期！"
                    })
                }else{
                    return res.json({
                        success:false,
                        code:-1,
                        msg:"token信息错误"
                    })
                }
                // return res.status(401).json(error)
            }else{
                // 没问题就把解码后的信息保存到请求中，供后面路由使用(有前面生成token时带的信息)
                req.api_user=decoded;
                // console.log("req.api_user",req.api_user)
                next()
            }
        })
    }else{
        return res.json({
            success:false,
            code:-1,
            msg:"没有提供token！"
        })
        // 401
    }
    // TODO 没有token或者token错误的话可以返回401状态码，前端分辨后重定向
}
module.exports={
    ensureAuthorized,
}