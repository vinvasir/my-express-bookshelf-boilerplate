
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('posts', table => {
  		table.increments();
  		table.integer('user_id');
  		table.string('title');
  		table.text('body');
  		table.timestamps();
  	})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('posts')
	]);
};
