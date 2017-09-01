
let express = require('express');
let path = require('path');
let app = express();
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use(express.static(path.resolve('node_modules')));
let index = require('./routes/index');
let user = require('./routes/users');
let article = require('./routes/article');
app.use('/',index);
app.use('/user',user);
app.use('/article',article);
app.listen(8080);
