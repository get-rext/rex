require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'rex'
  }
});

knex.schema
  .createTable('books', table => {
    table.increments();
    table.string('title').unique();
    table.string('url');
    table.integer('api_id');
    table.string('thumbnail_url');
    table.text('description');
    table.float('rating');
  })
  .createTable('users', table => {
    table.increments();
    table.string('username').unique();
    table.string('password');
    table.string('first_name');
    table.string('last_name');
  })
  .createTable('recommendations', table => {
    table.increments();
    table.integer('recommender_id');
    table.integer('user_id');
    table.integer('item_id');
    table.text('comment');
    table.string('recommender_name');
    table.string('status').defaultTo('active');
    table.string('category');
    table.float('user_rating');
    table.timestamp('date_added', true);
  })
  .then(done => {
    console.log('done: ' + done);
  })
  .catch(err => {
    console.log(err);
  });
