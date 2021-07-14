const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const { initialize } = require('passport');
const passport = require('passport');



//setup express
const app = express();

// set up view engine

app.set('view engine','ejs');

app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys : [keys.session.cookieKey]
}));

//initialize passport with cookies
app.use(passport.initialize());
app.use(passport.session()); 

//conect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true , useUnifiedTopology: true
  } ,()=>{
      console.log('Database connected')
  });

//setup routes

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes)

app.get('/',(req,res)=>{
   res.render('home',{user : req.user}); 
})

app.listen(3000,()=>{
    console.log('app now listed on port 3000')
})