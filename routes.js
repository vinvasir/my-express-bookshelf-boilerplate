const express = require('express');
const Router = express.Router();

// Load the models file, which loads the db init file

const models = require('./models/models.js');

Router.get('/', (req, res) => {
  models.User
    .collection()
    .fetch({withRelated: ['posts']})
    .then(users => { res.render('index', {users: users.toJSON()}) })
    .catch(err => res.status(500).json({ message: err}));
});

Router.get('/users/:id', (req, res) => {
	models.User.forge({id: req.params.id})
		.fetch({withRelated: ['posts']})
		.then(user => res.render('users/show', {user: user.toJSON()}))
		.catch(err => res.status(500).json({message: err}));
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

module.exports = Router;