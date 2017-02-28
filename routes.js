const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());

const Router = express.Router();

// Load the models file, which loads the db init file

const models = require('./models/models.js');

passport.use(new LocalStrategy((username, password, done) => {
  models.User
    .forge({username: username})
    .fetch()
    .then(usr => {
      if (!usr) {
        return done(null, false);
      }
      usr.validatePassword(password).then(valid => {
        if (!valid) {
          return done(null, false);
        }
        return done(null, usr);
      });
    })
    .catch(err => {
      return done(err)
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(user, done) {
  models.User
    .forge({id: user})
    .fetch()
    .then((usr) => {
      done(null, usr);
    })
    .catch((err) => {
      done(err);
    });
});

// a custom middleware to log which user is signed in
Router.use((req, res, done) => {
  if (req.session && req.session.passport) {
    console.log('user is logged in: ', req.session.passport);
  }
  else {
    console.log('user not logged in');
  }
  done();
});

Router.get('/', (req, res) => {
  models.User
    .collection()
    .fetch({withRelated: ['posts']})
    .then(users => { res.render('index', {users: users.toJSON()}) })
    .catch(err => res.status(500).json({ message: err}));
});

Router.get('/register', (req, res) => {
	res.render('users/new');
});

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
});

Router.post('/users', (req, res) => {
	models.User.forge({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}).save()
	.then(user => res.redirect(`/users/${user.id}`))
	.catch(err => res.status(500).json({message: err}));
});

Router.get('/users/:id', (req, res) => {
	if (req.session.passport === req.params.id) {
		console.log("You're viewing your own profile!");
	}
	models.User.forge({id: req.params.id})
		.fetch({withRelated: ['posts']})
		.then(user => res.render('users/show', {user: user.toJSON()}))
		.catch(err => res.status(500).json({message: err}));
});

Router.get('/login', (req, res) => {
	res.render('login', { message: req.flash('error')});
});

Router.get('/posts/new', (req, res) => {
	res.render('posts/new');
});

Router.post('/posts', (req, res) => {
	let postData = {
		user_id: req.body.user_id,
		title: req.body.title,
		body: req.body.body
	};

	models.Post.forge(postData).save()
		.then(() => res.redirect('/'))
		.catch(err => res.status(500).json({message: err}));
});

Router.get('/posts/:id', (req, res) => {
	models.Post.forge({id: req.params.id})
		.fetch({withRelated: ['user', 'comments.user']})
		.then(post => res.render('posts/show', {post: post.toJSON()}))
		.catch(err => res.status(500).json({message: err}));
});

Router.post('/comments', (req, res) => {
	models.Comment.forge({
		user_id: req.body.user_id,
		post_id: req.body.post_id,
		body: req.body.body
	}).save()
	.then(() => res.redirect(`/posts/${req.body.post_id}`))
	.catch(err => res.status(500).json({message: err}));
});

module.exports = Router;