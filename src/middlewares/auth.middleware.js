import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// TODO: how to manage different JWT_SECRET 
if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}

export const authenticate = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json(new ApiResponse(401, "Unauthorized access"));
    }

    try {

        const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("authenticate middleware error: ", error);
        return res.status(403).json(new ApiResponse(403, "Token expired or invalid"));
    }
}