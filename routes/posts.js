const express = require('express');
const router = express.Router();
const User = require('../db/models/users');
const Post = require('../db/models/posts');

router.get('/', async (req, res) => {
  let allData = await Post.find();
  console.log(allData);
  res.render('posts', { allData } )
});

router.post('/addpost', async (req, res) => {
  if (req.session.loginSession) {
    let userToPost = await User.findOne({ login: req.session.loginSession })
    let newPost = new Post ({
      author: req.session.loginSession,
      photo: req.body.photolink,
      body: req.body.postBody,
      date: new Date,
    });
    await newPost.save();
    userToPost.posts.push(newPost._id);
    await userToPost.save();
    return res.redirect('/posts')
  } else {
    return res.status(400).send('You are not logged in')
  }
});

router.post('/edit/:id', async (req, res) => {
  let postToEdit = await Post.findOne({ _id: req.params.id });
  let userToEdit = await User.findOne({ login: req.session.loginSession });
  if (userToEdit.posts.includes(postToEdit._id)) {
    return res.render('editform', { postToEdit })
  } else {
    return res.status(400).send('It is non your post!')
  }
});

router.post('/update/:id', async (req, res) => {
  await Post.updateMany({ _id: req.params.id }, { $set: { photo: req.body.photolink, body: req.body.postBody } })
  res.redirect('/posts')
});

router.post('/delete/:id', async (req, res) => {
  let postToDelete = await Post.findOne({ _id: req.params.id });
  let userToDelete = await User.findOne({ login: req.session.loginSession });
  if (userToDelete.posts.includes(postToDelete._id)) {
    await Post.findOneAndDelete({ _id: req.params.id });
    userToDelete.posts.splice(userToDelete.posts.indexOf(req.params.id), 1);
    return res.redirect('/posts')
  } else {
    return res.status(400).send('It is non your post!')
  }
});

module.exports = router;


