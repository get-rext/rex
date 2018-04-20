const Sequelize = require("sequelize");

const host = process.env.DATABASE_URL || {
  database: "rex",
  username: "shuchen",
  password: null,
  dialect: "postgres"
};

const sequelize = new Sequelize(host);

sequelize
  .authenticate()
  .then(() => console.log("connection made"))
  .catch(() => console.log("cannot connect"));

exports.promiseQuery = query =>
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

exports.insertQuery = query => sequelize.query(query, { returning: true });

exports.deleteQuery = query => sequelize.query(query, { returning: true });

exports.updateQuery = query =>
  sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

exports.validateQuery = query => sequelize.query(query, { returning: true });

exports.MODE_PRODUCTION = "mode_production";
