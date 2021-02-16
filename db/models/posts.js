const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/exam';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let postScheme = new mongoose.Schema({
  author: String,
  photo: String,
  body: String,
  date: Date,
});

let Post = mongoose.model('posts', postScheme);

module.exports = Post;
