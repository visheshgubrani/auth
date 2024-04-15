import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/auth`)
        console.log('Connection to Database Successful');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export {connectDB}