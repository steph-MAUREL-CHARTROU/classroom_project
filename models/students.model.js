module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    bio: {
      type: Sequelize.TEXT,
    },
    level: {
      type: Sequelize.INTEGER,
    },
    class_name: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.DATE,
    },
    profile_picture: {
      type: Sequelize.TEXT,
    },
  });
  return Student;
};
