import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGODB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log('Error when connect to database : ', error.message)
        process.exit(1) // 1 is fail , 0 is success 
    }
}