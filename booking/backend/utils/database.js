const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodecomplete", "root", "das@55555", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;