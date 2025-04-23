import passport from "passport";
import GoogleAuth from "passport-google-oauth20";
import { User } from "../models/user.model.js";
const GoogleStrategy = GoogleAuth.Strategy;

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not set");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not set");
}

if (!process.env.GOOGLE_CALLBACK_URL) {
    throw new Error("GOOGLE_CALLBACK_URL is not set");
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, cb) => {
    try {
        const user = await User.findOne({ googleId: profile.id });

        if (user) {
            return cb(null, user);
        } else {
            const newUser = new User({
                googleId: profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                // username: profile.displayName.replace(/\s/g, '').toLowerCase(),
                // password: "google",
            });
            await newUser.save();
            return cb(null, newUser);
        }
        
    } catch (error) {
        console.log("Error in Google Strategy: ", error);
        return cb(error, null);
    }
}
));


// Optional: serialize/deserialize for session support
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


