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
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: '/auth/google/callback'
}, function verify(accessToken, refreshToken, profile, cb) {
    // verification logic here
    console.log("Profile ", profile);
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        emails: profile.emails
    };
    return cb(null, user);
}));
/*
passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });
  
//passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), 
// success route
(req, res) => {
    const user = req.user;
    console.log("Display Name ", user.displayName);
    console.log("Emails ", user.emails);
    res.redirect(`/auth/success?user=${user.displayName}`);
});
router.get('/success', (req, res) => {
    const user = req.query.user;
    res.send(`Hello ${user}`);
});
router.get('/', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
});
export default router;
