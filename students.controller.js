const { Student } = require("../models/db");
const { getAge } = require("../services/students.service");
const erreurCall = require("../services/call.service");


////////////////////////////////////////////////////GET ALL /////////////////////////////////////////////////////////////////////////

exports.getAll = async (req, res) => {
  try {
    let listeEtudiants = await Student.findAll();
    if (!listeEtudiants.length) {
      const message = " La liste des étudiants est vide";
      return res.json(message);
    }

    listeEtudiants = listeEtudiants.map((etudiant) => {
      etudiant.age = getAge(etudiant.birthdate);
      return etudiant;
    });
    const message = `La liste a été récupérée. Il y'a en tout ${listeEtudiants.length} étudiant(s);`;
    res.json({ message, listeEtudiants });
  } catch (error) {
    erreurCall(error, res);
  }
};

/////////////////////////////////////////////////////////GET BY ID //////////////////////////////////////////////////////////////////////

exports.getById = async (req, res) => {
  try {
    let etudiant = await Student.findByPk(req.params.id);

    if (etudiant === null) {
      const message =
        " L'étudiant demandé n'existe pas, merci d'essayer avec un autre ID";
      res.statut(400).json(message);
    }
    etudiant.age = getAge(etudiant.birthdate);
    const message = "Un étudiant a bien été trouvé";
    res.json({ message, etudiant });
  } catch (error) {
    erreurCall(error, res);
  }
};

/*
exports.update = async (req, res) => {
  if (
    req.body.title &&
    req.body.hours &&
    req.body.teacher &&
    req.body.file_name &&
    req.body.starting_date &&
    req.body.ending_date &&
    req.params.id
  ) {
    try {
      await Lesson.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.json({ id: req.params.id, ...req.body });
    } catch (e) {
      res.json(500);
      res.json({ error: e });
    }
  } else {
    res.status(400);
    res.json({ error: "bad request" });
  }
};

exports.create = async (req, res) => {
  if (
    req.body.title &&
    req.body.hours &&
    req.body.teacher &&
    req.body.file_name &&
    req.body.starting_date &&
    req.body.ending_date
  ) {
    try {
      let result = await Lesson.create(req.body);
      res.json(result);
    } catch (e) {
      res.status(500);
      res.json({ error: e });
    }
  } else {
    res.json({ error: `Veuillez remplir les tous les champs neccessaires` });
  }
};
exports.getById = async (req, res) => {
  if (req.params.id) {
    try {
      let result = await Lesson.findByPk(req.params.id);
      let newResult = lessonsService.checkFinished(result);
      res.json(newResult);
    } catch (e) {
      res.status(500);
      res.json({ message: e });
    }
  } else {
    res.json({ error: `Veuillez remplir les tous les champs neccessaires` });
  }
};

exports.remove = async (req, res) => {
  if (req.params.id) {
    try {
      await Lesson.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (e) {
      res.status(500);
      res.json({ message: e });
    }
  }
};


*/
