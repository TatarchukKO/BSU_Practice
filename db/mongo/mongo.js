const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connection success');
});

const articleSchema = new mongoose.Schema({
  author: String,
  image: String,
  title: String,
  content: String,
  summary: String,
  createdAt: Date,
  tags: [String]
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

/*
const ArticleModel = mongoose.model('articles', articleSchema);
const UserModel = mongoose.model('users', userSchema);
*/

/*module.exports.ArticleModel =  ArticleModel;
 module.exports.UserModel = UserModel;*/

module.exports.ArticleModel = db.model('articleModel', articleSchema);
module.exports.UserModel = db.model('userModel', userSchema);