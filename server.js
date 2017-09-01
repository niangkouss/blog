
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let app = express();
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve('node_modules')));
app.use(session({
    resave:true,
    secret:'mySecret',
    saveUninitialized:true
}));
let index = require('./routes/index');
let user = require('./routes/users');
let article = require('./routes/article');
app.use(function (req,res,next) {
    res.locals.user = req.session.user;
    next();
});
app.use('/',index);
app.use('/user',user);
app.use('/article',article);
app.listen(8080);
