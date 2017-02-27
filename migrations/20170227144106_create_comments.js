
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('comments', table => {
  		table.increments();
  		table.integer('user_id');
  		table.integer('post_id');
  		table.text('body');
  	})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('comments')
	]);
};
