import { User } from "../models/user.model.js";

export const findUserByEmailOrUsername = async (email, username) => {
    const user = await User.findOne({ $or: [{email}, {username}]});
    return user;
}

export const findUserByEmail = async (email) => {
    const user = await User.findOne({email});
    return user;
}



// export const createUser = async (fullName, username, email, hashedPassword) => {
//     const newUser = await User.create({
//         fullName,
//         username: username ? username?.toLowerCase() : null,
//         email,
//         password: hashedPassword,
//       });
    
//     return newUser;
// }

export const createUser = async (fullName, email, hashedPassword) => {
    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
    
    return newUser;
}