import mongoose, { mongo } from 'mongoose'

const connectDB=async()=>{
    // console.log('hi');
    
    mongoose.connection.on('connected',()=>console.log("db connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`)
}
export default connectDB