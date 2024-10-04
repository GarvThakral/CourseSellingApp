const express = require('express')
const app = express()
const {userRouter} = require('./routes/user.js')
const {adminRouter} = require('./routes/admin.js')
const {courseRouter} = require('./routes/course.js')
const mongoose = require('mongoose')
const {mongoDB} = require('./config')
mongoose.connect(mongoDB)
app.use(express.json())

app.use('/app/v1/user',userRouter)
app.use('/app/v1/admin',adminRouter)
app.use('/app/v1/course',courseRouter)

async function main(){
    await mongoose.connect(mongoDB)
    console.log("Connected on port 3000")
    app.listen(3000)
}
main()