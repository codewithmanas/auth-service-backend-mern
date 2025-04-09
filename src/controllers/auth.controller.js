import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        const newUser = await User.create({
            fullName,
            username: username.toLowerCase(),
            email,
            password
        });

        res.status(200).json(newUser);
        
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json("Internal Server Error");
    }
    
};