let express = require('express');
let router = express.Router();
let {UserModel} = require('../model');
let {checNotkLogin,checkLogin} = require('../auth');
let multer = require('multer');
let uploads = multer({dest:'public/uploads'});
router.get('/signup',checNotkLogin,function (req,res) {
    res.render('user/signup',{title:'注册'});
});
router.post('/signup',uploads.single('avatar'),checNotkLogin,function (req,res) {
    let user = req.body;
    user.avatar = `/uploads/${req.file.filename}`;
    UserModel.create(user,function (err,doc) {
        if(err){
            req.flash('error','用户注册失败');
            res.redirect('back');
        }else{
            req.flash('success','用户注册成功');
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
            req.flash('error','用户登录失败');
            res.redirect('back');
        }else{
           if(doc){
               req.flash('success','用户登录成功')
               req.session.user = doc;
               res.redirect('/');
           }else{
               req.flash('error','用户名或密码不正确');
               res.redirect('back');
           }
        }
    });
});
router.get('/signout',checkLogin,function (req,res) {
    req.flash('error','用户退出成功');
    req.session.user = null;
    res.render('user/signout',{title:'退出'});
});
module.exports = router;