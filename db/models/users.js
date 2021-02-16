const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/exam';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let userScheme = new mongoose.Schema({
  login: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: 'basic'
  },
  posts: [{
    type: mongoose.ObjectId,
    ref: 'posts'
  }]
});

let User = mongoose.model('users', userScheme);

module.exports = User;
