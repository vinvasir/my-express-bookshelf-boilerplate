const bookshelf = require('../database_init.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  posts: function() {
    return this.hasMany(Post);
  }
});

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

const Comment = bookshelf.Model.extend({
  tableName: 'comments',
  hasTimeStamps: true,
});

const models = {
	User: User,
	Post: Post,
  Comment: Comment
}

module.exports = models;