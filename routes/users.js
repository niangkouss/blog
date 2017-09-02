let express = require('express');
let router = express.Router();
let {UserModel} = require('../model');
let {checNotkLogin,checkLogin} = require('../auth');
router.get('/signup',checNotkLogin,function (req,res) {
    res.render('user/signup',{title:'注册'});
});
router.post('/signup',checNotkLogin,function (req,res) {
    let user = req.body;
    UserModel.create(user,function (err,doc) {
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/user/signin');
        }
    });
});
router.get('/signin',checNotkLogin,function (req,res) {
    res.render('user/signin',{title:'登录'});
});
router.post('/signin',checNotkLogin,function (req,res) {
    let user = req.body;
    UserModel.findOne(user,function (err,doc) {
        if(err){
            res.redirect('back');
        }else{
           if(doc){
               req.session.user = doc;
               res.redirect('/');
           }else{
               res.redirect('back');
           }
        }
    });
});
router.get('/signout',checkLogin,function (req,res) {
    req.session.user = null;
    res.render('user/signout',{title:'退出'});
});
module.exports = router;