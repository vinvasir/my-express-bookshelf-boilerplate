const bookshelf = require('../database_init.js')
const Post = require('./post.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  posts: function() {
    return this.hasMany(Post);
  }
});

module.exports = User;