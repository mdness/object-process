import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { modelUser } from "../models/index.js";

const optionsStra = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};

const sign = async (req, username, password, done) => {

    console.log("Signed Up");

    try {

        const newUser = await user.create({ username, password });

        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        return done(null, newUser);

    } catch (error) {

        console.log(error);
        return done(null, false)

    }

}

const log = async (req, username, password, done) => {

    console.log("Logged In");

    const usuario = await user.findOne({ username });

    if (!usuario) {

        return done(null, false);

    } else {

        console.log("User found");
        const compare = await usuario.comparePassword(password);
        console.log(compare)
        compare ? done(null, usuario) : done(null, false);

    }

}

export const logFunc = new LocalStrategy(optionsStra, log);
export const signFunc = new LocalStrategy(optionsStra, sign);

passport.serializeUser((user, done) => {

    done(null, user._id);

});

passport.deserializeUser((userID, done) => {

    const usuario = user.findById(userID);
    return done(null, usuario);

});