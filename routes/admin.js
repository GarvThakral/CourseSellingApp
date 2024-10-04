const {Router} = require('express');
const adminRouter = Router(); 
const {adminModel} = require('../db')
const {courseModel} = require('../db')
const z = require('zod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_ADMIN_SECRET} = require('../config')
const {adminMiddleware} = require('../middlewares/admin')
adminRouter.post('/signup',async (req,res)=>{
    const {email,password,firstName,lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,5)
    try{
        await adminModel.create({
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
        message:"admin has been signed up"
    })

})

adminRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try{

    const admin =  await adminModel.findOne({
        email
    })
    if(!admin){
        res.status(303).json({
            message:"This admin does not exist"
        })
    }else{
        const isPassword = await bcrypt.compare(password,admin.password)
        if(!isPassword){
            res.status(303).json("Incorrect credentials")
        }else{
            const token = jwt.sign({id:admin._id},JWT_ADMIN_SECRET)
            res.json({
                message:"admin signed in",
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
adminRouter.post('/course',adminMiddleware,async (req,res)=>{
    const {title,description,price,imageUrl} = req.body;
    try{
        const course = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId:req.userId
        })
        res.json({
            message:"Course created",
            courseId:course._id
        })
    }catch(e){
        res.status(304).json({
            error:e
        })
    }
})
adminRouter.get('/courses/bulk',adminMiddleware,async (req,res)=>{
    const courses = await courseModel.find({
        creatorId:req.userId
    })
    console.log(courses)
    res.json({
        courses
    })
})

module.exports = {
    adminRouter
}