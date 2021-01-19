const { Sequelize, Datatypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const config = require("../config/db.config");
const studentModel = require("./students.model");
const userModel = require("./user.model");
const lessonModel = require("./lessons.model");

const listeEtudiants = require ('../config/test/liste.etudiants');
const listeUsers = require("../config/test/liste.users");

const sequelize = new Sequelize(
    config.DB,
    config.USER, 
    config.PASSWORD,
     {
        host: config.HOST,
        dialect: config.DIALECT,
        logging : false
});

const Student = studentModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Lesson = lessonModel(sequelize, Sequelize);

Student.hasOne(User, {foreignKey : "EtudiantID"});
User.belongsto(Student, {onDelete: 'cascade'});

const initDb = () => {
  return sequelize.sync({force : true})
    .then((_) => {
        listeEtudiants.map(student => {
            Student.create(student);
        })
        listeUsers.map(user => {
          user.password = bcrypt.hashSync(user.password, 5);
            User.create(user);
        })
      console.log("connection à la BDD ok");
    })
    .catch((error) => {
      console.log("Erreur lors de la connexion BDD \n" + error);
    });
};

module.exports = {
    initDb, Student, User, Lesson
};
