const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal= require('passport-local');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

require('./config/passport')(passport);

require('./models/db');
//include app styleing part
app.use(express.static(__dirname + '/public'));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use(flash());


app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(function(req, res, next){
  res.locals.isAuthenticated = req.
      isAuthenticated();
      next();
});
// function checkAuthentication(req,res,next){
//   if(req.isAuthenticated()){
//       //req.isAuthenticated() will return true if user is logged in
     
//       next();
//   } else{
//       res.redirect("/users/login");
//   }
// } 


app.use('/', require('./controller/home.js'));
app.use('/users', require('./controller/users.js'));
app.use('/admin', require('./controller/admin.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));