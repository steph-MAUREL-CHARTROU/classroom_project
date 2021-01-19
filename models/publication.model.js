const { sequelize, Sequelize } = require("./db");

module.exports = (sequelize, Sequelize) => {
  const Publication = sequelize.define("Publication", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    creation_date: {
      type: Sequelize.DATE,
    },
    body_text: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.STRING,
    }
  });
  return Publication;
};
