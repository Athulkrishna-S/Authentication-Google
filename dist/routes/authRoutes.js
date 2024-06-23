import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const router = express.Router();
import session from 'express-session';
router.use(session({
    secret: 'your_secret_key', // Replace with your own secret
    resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);
console.log(process.env.PORT);
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, function verify(accessToken, refreshToken, profile, cb) {
    // verification logic here
    const user = {
        id: profile.id,
        displayName: profile.displayName
    };
    return cb(null, user);
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
// success route
(req, res) => {
    res.redirect('/auth/success');
});
router.get('/success', (req, res) => {
    console.log('Profile name : ', req.user);
    const user = req.user;
    res.send(`Hello ${user.displayName}`);
});
router.get('/', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});
export default router;
