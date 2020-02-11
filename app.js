const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const nunjucks = require('nunjucks');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(express.static('static'))

app.set('view engine', 'njk');
nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: true,
  express: app,
  watch: true
});

app.get('/', (_req, res) => res.render('login'));
app.get('/login', passport.authenticate('steam'));
 
app.get('/steam', passport.authenticate('steam', { 
  failureRedirect: '/' 
}), (req, res) => {
  const props = { ...req.user };
  res.render('steam', props);
});

passport.use(new SteamStrategy({
  returnURL: process.env.URL ? `${process.env.URL}/steam` : `http://localhost:${port}/steam`,
  realm: process.env.URL || `http://localhost:${port}`,
  apiKey: process.env.STEAM_API_KEY
}, (_identifier, profile, done) => {

  const user = {
    id: profile.id,
    username: profile.displayName,
    avatar: profile._json.avatarfull,
  }

  return done(null, user);
}));

app.use((_req, res) => {
  res.redirect('/');
});

app.use((_err, _req, res, _next) => {
  res.redirect('/');
});

app.listen(port, () => console.log(`Running on ${process.env.URL || `http://localhost:${port}/`}`));
