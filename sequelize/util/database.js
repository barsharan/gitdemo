// util/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('barsha', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
