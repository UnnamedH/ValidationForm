const Sequelize = require("sequelize");
const mysql = require("mysql");

const sequelize = new Sequelize("store", "root", "zlatodima", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
});
 
const User = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = User;

