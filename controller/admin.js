const express = require('express');
const mongoose = require('mongoose');
const Post= require('../models/post');
const multer = require('module');
const router = express.Router();

const {ensureAuthenticate} =require('../config/auth');

const DIR = './public/images';

router.get('/adminhome', ensureAuthenticate,checkAdminAuthentication,function(req, res){
    res.render('Admin/adminHome',{
        layout:"layoutAdmin",
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
router.post('/create-post', function(req, res){
    if(req.body._id == ''){
        InsertData(req,res);
    }else{
       // UpdateData(req, res);
    }
});

function InsertData(req,res){
    var titleName= req.body.titleName;
    var date = req.body.date;
    var titleImage = req.file.titleImage;
    var headImage = req.file.headImage;
    var details =  req.body.details;
    let errors=[];
    if(!titleName || !date || !titleImage || !headImage || !details){
        errors.push({msg:'Please fill all required field'});
    }
    if(details.length>250){
        errors.push({msg:'discription should be grater than 250'});
    }
    if(!file.mimetype == "image/jpg" || !file.mimetype == "image/png" || !file.mimetype=="image/jpeg"){
        errors.push({msg:"image type is not matched"});
    }
    titleImage.mv(DIR+titleImage.name, function(err){
        if(err){
            errors.push({msg:"failed to upload title image file"});
            console.log("success");
        }
    });
    headImage.mv(DIR+headImage.name, function(err){
        if(err){
            errors.push({msg:"error to upload header image file"});
            console.log("success");
        }
    });
    var titlefile=DIR+titleImage.name+'-'+Date.now;
    var headfile= DIR+headImage.name+'-'+Date.now;
    
    var post= new Post();
    post.titleName = titleImage;
    post.dateofPost=date;
    post.titleImage=titlefile;
    post.headerImage=headfile;
    post.discription=details;
    post.save((err, doc)=>{
        if(!err){
            res.redirect('/admin/create-post');
            req.flash('success_msg', 'New post updated');

        }else{
            req.flash('errors_msg',"Check errors");
            console.log('some getting errors');
        }
    });
}













module.exports = router;