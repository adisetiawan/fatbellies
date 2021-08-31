require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE
});

module.exports = sequelize;