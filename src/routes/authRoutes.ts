import dotenv from 'dotenv';
dotenv.config();

import express , {Application , Request , Response , Router} from 'express';
import passport from "passport";
import { Strategy as GoogleStrategy , VerifyCallback} from 'passport-google-oauth20';
const router : Router = express.Router();
import session from 'express-session';

router.use(session({
    secret: 'your_secret_key', // Replace with your own secret
    resave: true,
    saveUninitialized: true
  }));

  
router.use(passport.initialize());
//router.use(passport.session());
  
interface User { 
    id: string,
    displayName: string
}




passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, function verify(accessToken: string, refreshToken: string, profile: any, cb: VerifyCallback): void {
    // verification logic here
    const user :User  = {
        id : profile.id,
        displayName : profile.displayName
    };

    return cb(null , user);
}));


/*
passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });
  
//passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });

  */
router.get('/google', passport.authenticate('google',{scope : ['profile']}));
router.get('/google/callback',passport.authenticate('google',{session : false,failureRedirect : '/'}),
// success route
(req : Request , res :Response) => {
    const user : User = req.user as User; 
    console.log("Display Name ",user.displayName);
    res.redirect(`/auth/success?user=${user.displayName}`);
});

router.get('/success',(req : Request , res : Response) => {
        const user = req.query.user;  
        res.send(`Hello ${user}`);
      
});


router.get('/',(req : Request , res : Response) => {
    res.sendFile('login.html', { root: 'public' });
});

export default router;