const config  = require('../knexfile.js');
const knex = require('knex')(config[process.env.NODE_ENV]);
const bookshelf = require('bookshelf')(knex);

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimeStamps: true,
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Post;