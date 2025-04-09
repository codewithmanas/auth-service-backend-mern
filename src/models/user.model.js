import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: { 
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
    },
    otp: {
        type: String,
        max: 6,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true});

export const User = mongoose.model("User", userSchema);