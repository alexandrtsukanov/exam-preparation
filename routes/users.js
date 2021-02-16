const express = require('express');
const router = express.Router();
const User = require('../db/models/users');

router.get('/', (req, res) => {
  res.render('homepage')
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.post('/signup', async (req, res) => {
  let newUser = new User({ 
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
      });
  let userToCheckEmail = await User.findOne({ email: req.body.email });
  if (userToCheckEmail) {
    return res.status(400).send('User with such e-mail has already signed up');
  } else {
    let userToCheckLogin = await User.findOne({ login: req.body.login });
    if (userToCheckLogin) {
      return res.status(400).send('User with such login has already signed up');
    } else {
      await newUser.save();
      req.session.loginSession = newUser.login;
      req.session.passwordSession = newUser.password
      req.session.emailSession = newUser.email;
      return res.redirect('/');
    }
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  let userToLogin = await User.findOne({ login: req.body.login });
  if (userToLogin) {
    if (userToLogin.password === req.body.password) {
      console.log(userToLogin);
      req.session.loginSession = req.body.login;
      req.session.passwordSession = req.body.password;
      req.session.emailSession = userToLogin.email;
      return res.redirect('/posts');
    } else {
      return res.status(400).send('Invalid password!')
    }
  } else {
    return res.status(400).send('There is no such user!')
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/about', (req, res) => {
  res.render('about')
});

router.post('/about', (req, res) => {
  res.render('test', { layout: false })
});

router.get('/info', (req, res) => {
  res.send('Info about users')
});

module.exports = router;
