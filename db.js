const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const adminSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
})
const purchaseSchema = new Schema({
    courseId:ObjectId,
    userId:ObjectId
})

const userModel = mongoose.model('users',userSchema)
const adminModel = mongoose.model('admins',adminSchema)
const courseModel = mongoose.model('courses',courseSchema)
const purchaseModel = mongoose.model('purchases',purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}