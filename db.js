const { Sequelize } = require("sequelize");

module.exports = new Sequelize("BotSelectBy", "root", "root", {
  host: "master.d539a45d-b553-4df5-8df3-1bdb79fd29dc.c.dbaas.selcloud.ru",
  port: 5432,
  dialect: "postgres",
});
