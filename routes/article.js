let express = require('express');
let router = express.Router();
let {checkNotLogin,checkLogin} = require('../auth');
let {Article} = require('../model');
router.get('/add',checkLogin,function (req,res) {
    res.render('article/add',{title:'发表文章',article:{}});
});
router.post('/add',checkLogin,function (req,res) {
        let article = req.body;
        article.user = req.session.user._id;
        Article.create(article,function (err,doc) {
            if(err){
                req.flash('error',err);
                res.redirect('back');
            }else{
                req.flash('success','文章发表成功');
                res.redirect('/');
            }
        })
});
router.get('/detail/:_id',function (req,res) {//_id是路径参数
    let _id = req.params._id;
    Article.findById(_id,function (err,article) {
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            res.render('article/detail',{title:'文章详情',article});
        }
    });
});
router.get('/delete/:id',function (req,res) {
    let _id = req.params.id;
    Article.remove({_id},function (err,result) {
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            console.log(req.params.id);
            req.flash('success','删除文章成功');
            res.redirect('/');
        }
    });
});
router.get('/update/:id',function (req,res) {
    let _id = req.params.id;
    Article.findById({_id},function (err,article) {
        res.render('article/add',{title:'更新文章',article})
    });
});
router.post('/update/:id',function (req,res) {
    let _id = req.params.id;
    Article.update({_id},req.body,function (err,result) {
       if(err){
           req.flash('error',err);
           res.redirect('back');
       }else{
           req.flash('success','文章更新成功');
           res.redirect('/article/detail/'+_id)
       }
    });
});
module.exports = router;