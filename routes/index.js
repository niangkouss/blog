let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/',function (req,res) {
    Article.find().populate('user').exec(function (err,articles) {
        res.render('index',{title:'首页',articles});
    });
});
module.exports = router;