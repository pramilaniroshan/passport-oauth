const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set up view engine

app.set('view engine','ejs');

//conect to mongodb
mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true , useUnifiedTopology: true
  } ,()=>{
      console.log('Database connected')
  });

//setup routes

app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
   res.render('home'); 
})

app.listen(3000,()=>{
    console.log('app now listed on port 3000')
})