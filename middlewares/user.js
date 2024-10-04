const jwt = require('jsonwebtoken')
const {JWT_USER_SECRET} = require('../config')

function userMiddleware(req,res,next){
    const token = req.headers.token
    try{
        const decodedInfo = jwt.verify(token,JWT_USER_SECRET)
        if(!decodedInfo){
            res.status(304).json({
                message:"Token is invalid sign in again"
            })
        }else{
            req.userId = decodedInfo.id
            next()
        }
    }catch(e){
        res.status(403).json({
            error:e
        })
    }
    
}
module.exports = {
    userMiddleware
}