const {Router} = require('express');
const courseRouter = Router();
const {userMiddleware} = require('../middlewares/user')
const {purchaseModel} = require('../db')

courseRouter.post('/purchases',userMiddleware,async (req,res)=>{
    const courseId = req.body.courseId
    console.log("Hello")
    try{
        const purchase = await purchaseModel.create({
            courseId,
            userId:req.userId
        })
        res.json({
            message:"Course purchased"
        })
    }catch(e){
        res.status(304).json({
            message:"Purchase failed"
        })
    }
    
})
module.exports = {
    courseRouter
}