import { ApiResponse } from "../utils/ApiResponse.js";

export const globalErrorHandler = (err, req, res, next) => {
    console.error("Error Stack: ", err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const data = err.data;
    const errors = process.env.NODE_ENV === 'development' ? err.errors : null;

    const response = new ApiResponse(statusCode, message, data, errors);

    res.status(statusCode).json(response);
}