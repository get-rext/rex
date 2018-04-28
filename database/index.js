const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'rex',
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => console.log('connection made'))
  .catch(err => console.log(`cannot connect: ${err}`));

exports.promiseQuery = query =>
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

exports.insertQuery = query => sequelize.query(query, { returning: true });

exports.deleteQuery = query => sequelize.query(query, { returning: true });

exports.updateQuery = query =>
  sequelize.query(query, {
    type: sequelize.QueryTypes.UPDATE,
    returning: true
  });

exports.validateQuery = query => sequelize.query(query, { returning: true });

exports.MODE_PRODUCTION = 'mode_production';
