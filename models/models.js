const bookshelf = require('../database_init.js');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  posts: function() {
    return this.hasMany(Post);
  },
  comments: function() {
    return this.hasMany(Comment);
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