
exports.checNotkLogin = function (req,res,next) {
    if(req.session.user){
        res.redirect('/')
    }else{
        next();
    }
};
exports.checkLogin = function (req,res,next) {
    if(req.session.user){
        next();
    }else{
        res.redirect('/user/signin');
    }
}
