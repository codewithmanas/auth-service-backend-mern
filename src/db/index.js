import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import { DB_NAME } from "../constant.js";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
}

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);

        console.log(`\nConnected to DB Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;