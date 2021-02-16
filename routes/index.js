const express = require('express');
const router = express.Router();
const Post = require('../db/models/posts');
const User = require('../db/models/users');

router.get('/', async (req, res) => {
  let allPosts = await Post.find();
  res.render('welcome')
});

router.get('/about', (req, res) => {
  res.render('about')
});

router.get('/test', (req, res) => {
  res.render('test')
});

module.exports = router;
