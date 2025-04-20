import jwt from "jsonwebtoken";

const JWT_SECRET =  "supersecret";

export const generateAccessToken = (id, fullName, email) => {
    const accessToken = jwt.sign({
        id, fullName, email
    },
    JWT_SECRET,
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
        JWT_SECRET,
        {
            expiresIn: "7d"
        })

        return refreshToken;
}