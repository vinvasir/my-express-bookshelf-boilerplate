"use strict";

// express basics
const _            = require('lodash');
const express      = require('express');
const path = require('path');

// load some middleware
const bodyParser   = require('body-parser');
const passport = require('passport');
const session = require('session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// load the routes file
const routes = require('./routes');

// Initialize Express.
const app = express();
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'our secret string'}));
app.use(cookieParser());
app.use(passport.iniitialize());

// Configure the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const currentEnv = process.env.NODE_ENV
// Configure & Initialize Bookshelf & Knex.
console.log('Running in environment: ' + process.env.NODE_ENV);
const bookshelf = require('./database_init.js');


// Mount the router (required above) at the root path
// The Router in turn calls the models file, which
// calls the DB init file,
// which calls the DB config file.
app.use(routes);

// app.get('/', (req, res) => {
//   models.User
//     .collection()
//     .fetch({withRelated: ['posts']})
//     .then(users => { res.render('index', {users: users.toJSON()}) })
//     .catch(err => res.status(500).json({ message: err}));

// });

// Exports for Server hoisting.
const port = 3000;
const listen = (port) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      console.log('listening on port', port)
      resolve();
    });
  });
};
if (currentEnv === "development") {
  listen(port);
};

exports.up = (justBackend) => {
  return knex.migrate.latest([process.env.NODE_ENV])
    .then(() => {
      return knex.migrate.currentVersion();
    })
    .then((val) => {
      console.log('Done running latest migration:', val);
      return listen(3000);
    })
    .then(() => {
      console.log('Listening on port 3000...');
    });
};
