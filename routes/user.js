const {Router} = require('express');
const userRouter = Router(); 
const {userModel} = require('../db')
const {courseModel} = require('../db')
const {purchaseModel} = require('../db')
const z = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_USER_SECRET} = require('../config')
const {userMiddleware} = require('../middlewares/user')

userRouter.post('/signup',async (req,res)=>{
    const {email,password,firstName,lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,5)
    try{
        await userModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        })

    }catch(e){
        res.status(303).json({
            error:e
        })
    }
    res.json({
        message:"User has been signed up"
    })

})

userRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try{

    const user =  await userModel.findOne({
        email
    })
    if(!user){
        res.status(303).json({
            message:"This user does not exist"
        })
    }else{
        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword){
            res.status(303).json("Incorrect credentials")
        }else{
            const token = jwt.sign({id:user._id},JWT_USER_SECRET)
            res.json({
                message:"User signed in",
                id:user.id,
                token
            })
        }
    }
    }catch(e){
        res.status(303).json({
            error:e
        })
    }
})
userRouter.get('/purchases',userMiddleware,async (req,res)=>{
    const courses = await purchaseModel.find({
        userId:req.userId
    })
    console.log(req.userId)
    res.json({
        courses
    })
})


module.exports = {
    userRouter
}