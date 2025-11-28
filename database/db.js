import mongoose from "mongoose";
import express from "express"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(` Connect To Mongo db : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;