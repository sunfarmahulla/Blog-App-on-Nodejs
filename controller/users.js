const express= require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User= require('../models/user');
const passport = require('passport');

router.get('/login',function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/dashboard');
     }else{
         res.render('Auth/login');
     }
});

router.get('/register',function(req, res){
    if(req.isAuthenticated()){
       res.redirect('/dashboard');
    }else{
        res.render('Auth/register');
    }
    
});


// function checkAuthentication(req,res,next){
//     if(req.isAuthenticated()){
//         //req.isAuthenticated() will return true if user is logged in
       
//         next();
//     } else{
//         res.redirect("/users/login");
//     }
// } 

router.post('/register', function(req, res){
    const{name, email, password, password2}=req.body;
    let errors=[];

    if(!name || !email || !password || !password2){
        errors.push({msg:'pleae fill all required fiels'});
        
    }
    if(password != password2){
        errors.push({msg:'password is not matching'});
    }
    if(errors.length>0){
        res.render('Auth/register',{errors,name, email, password, password2});
    }else{
        //user is model name
        User.findOne({email:email}).then(user=>{
            if(user){
                errors.push({msg:'Email is already exist'});
                res.render('Auth/register',{errors,name, email, password, password2});
                
            }else{
                const newUser= new User ({
                    name, email, password
                });
                bcrypt.genSalt(10,(err, salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw(err);
                    newUser.password= hash;
                    newUser.save(function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log('newUser:'+newUser.email+"saved");
                        }
                    });
                    passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:true }),
                    res.redirect('/dashboard');

                }));
            }
        });
    }
});

router.post('/login', (req,res,next) =>{ 
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports= router;