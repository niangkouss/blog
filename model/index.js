let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/blogData',{useMongoClient: true});
let UserSchema = new mongoose.Schema({
   username:String,
    password:String,
    email:String
});
let UserModel = mongoose.model('User',UserSchema);
exports.UserModel = UserModel;
