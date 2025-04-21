import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
}

export const generateAccessToken = (id, fullName, email) => {
    const accessToken = jwt.sign({
        id, fullName, email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    })

    return accessToken;
}

// export const generateAccessToken = (id, fullName, username, email) => {
//     const accessToken = jwt.sign({
//         id, fullName, username, email
//     },
//     JWT_SECRET,
//     {
//         expiresIn: "1d"
//     })

//     return accessToken;
// }

export const generateRefreshToken = (id) => {

        const refreshToken = jwt.sign({
            id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        })

        return refreshToken;
}