import { createUser, findUserByEmail, findUserByEmailOrUsername } from "../services/auth.service.js";
import { comparePassword } from "../utils/comparePassword.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateAccessAndRefreshToken.js";
import { hashPassword } from "../utils/hashPassword.js";

// Register User
export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {

    const user = await findUserByEmailOrUsername(email, username);

    if(user) {
        return res.status(401).json("User with email or username already exists");
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // create the user
    const newUser = await createUser(fullName, username, email, hashedPassword);

    return res.status(200).json(newUser);

  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json("Internal Server Error");
  }
};


// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
  
      const user = await findUserByEmail(email);
  
      if(!user) {
        return res.status(401).json("User with email or username does not exist");
      }
  
      // compare the password
      const isMatch = await comparePassword(password, user.password);

  
      if(!isMatch) {
        return res.status(401).json("Invalid Credentials");
      }

      const accessToken = generateAccessToken(user._id, user.fullName, user.username, user.email);
      const refreshToken = generateRefreshToken(user._id);

      user.refreshToken = refreshToken;
      await user.save();

      const cookieOptions = {
        httpOnly: true,
        secure: true
      }

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      return res.status(200).json({ message: "Logged in Successfully", accessToken: accessToken, refreshToken: refreshToken});
  
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json("Internal Server Error");
    }
  };
