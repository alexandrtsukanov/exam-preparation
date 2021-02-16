const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const postsRouter = require('./routes/posts.js');

mongoose.connect('mongodb://localhost:27017/exam', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const { urlencoded } = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('trust proxy', 1);

app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'abcde12345',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.loginLocals = req.session?.loginSession;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(3001, () => {
  console.log('server started')
});
