let mongoose = require('mongoose');
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://127.0.0.1/blogData',{useMongoClient: true});
let UserSchema = new mongoose.Schema({
   username:String,
    password:String,
    email:String,
    avatar:String
});
let UserModel = mongoose.model('User',UserSchema);
exports.UserModel = UserModel;

let ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now},
    user:{type:ObjectId,ref:'User'}
})
let Article = mongoose.model('Article',ArticleSchema);
exports.Article = Article;