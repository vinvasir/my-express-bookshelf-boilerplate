const bookshelf = require('../database_init.js');
const bcrypt = require('bcrypt');

const User = bookshelf.Model.extend({
  tableName: 'users',
  initialize: function() {
    this.on('creating', this.encryptPassword);
  },
  hasTimeStamps: true,
  posts: function() {
    return this.hasMany(Post);
  },
  comments: function() {
    return this.hasMany(Comment);
  },
  encryptPassword: (model, attrs, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.attributes.password, 10, (err, hash) => {
        if (err) return reject(err);
        model.set('password', hash);
        resolve(hash);
      });
    });
  },
  validatePassword: function(suppliedPassword) {
    let self = this;
    return new Promise(function(resolve, reject) {
      const hash = self.attributes.password;
      bcrypt.compare(suppliedPassword, hash, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }
});

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  },
  comments: function() {
    return this.hasMany(Comment);
  }
});

const Comment = bookshelf.Model.extend({
  tableName: 'comments',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  },
  post: function() {
    return this.belongsTo(Post);
  }
}); 

const models = {
	User: User,
	Post: Post,
  Comment: Comment
}

module.exports = models;