const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articleWorker = require('./serverWorkers/articleWorker');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const SessionStore = require('connect-diskdb')(session);
const store = new SessionStore({path: './db/', name: 'sessions'});
const UserModel = require('./db/mongo/mongo').UserModel;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: store,
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 3000));
app.use(express.static(`${__dirname}/public`));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/articles/count', articleWorker.getArticlesSize);
app.get('/articles/:id', articleWorker.getArticle);
app.put('/articles', articleWorker.getArticles);
app.post('/articles', articleWorker.addArticle);
app.delete('/articles/:id', articleWorker.removeArticle);
app.patch('/articles', articleWorker.editArticle);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  const error = user ? null : new Error('error deserialize');
  done(error, user);
});
passport.use('login', new LocalStrategy({
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    UserModel.findOne({username}, (err, user) => {
      if (err)
        return done(null, false, { message: 'User is not found'});
      if (!user)
        return done(null, false, { message: 'Incorrect username.' });
      if (password !== user.password)
        return done(null, false, { message: 'Wrong password'});
      return done(null, user);
    });
  }));
app.post('/login', passport.authenticate('login'), (req, res) => res.sendStatus(200));
app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});
app.get('/username', (req, res) => req.user ? res.send(req.user.username) : res.sendStatus(401));
