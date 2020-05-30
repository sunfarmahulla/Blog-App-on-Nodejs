const express = require('express');

const router = express.Router();
const {ensureAuthenticate} =require('../config/auth');

router.get('/adminhome', ensureAuthenticate,checkAdminAuthentication,function(req, res){
    res.render('Admin/adminHome',{
        layout:"layoutA",
        name:req.user.name,
        role:req.user.role
    });
});

function checkAdminAuthentication(req,res,next){
  if(req.isAuthenticated() && req.user.role==='admin'){
      //req.isAuthenticated() will return true if user is logged in
     next();
  } else{
      req.flash('error_msg','You are not authorised to see this page, if you want please contact admin');
      res.redirect("/dashboard");
  }
} 
module.exports = router;