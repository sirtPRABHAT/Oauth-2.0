const express = require('express');
const path = require('path');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/userModel");
const cookieSession = require("cookie-session");


passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value) 
        User.findOne({Google_Id: profile.id}).then((currentUser)=>{
          if(currentUser){
            done(null, currentUser);
          } else{
              new User({
                Google_Id: profile.id,
                name: `${profile.name.givenName} ${profile.name.familyName}` ,
                email:profile.emails[0].value,
              }).save().then((newUser) =>{
                done(null, newUser);
              });
           } 
        })
      })
  )


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });

 

const app = express();
const Router = express.Router();



app.use(cookieSession({ 
    maxAge: 24*60*60*1000,
    keys:process.env.COOKIE_KEY
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());


 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
    res.status(200).render('home')

})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', "email"]
  }));


app.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.status(200).render('secret_page',{
        user: req.user
    })
// res.send(req.user);
});


 module.exports = app

