const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/db");
const erreurCall = require("../services/call.service");
const privateKey = require("../config/private-key");
const { checkDuplicateEmail } = require("../services/user.service");

exports.login = async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        return res.status(404).json({
          message: "Cet email ne correspond a aucun compte.",
        });
      }

      const verifPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!verifPassword) {
        const message = "Le mot de passe est incorrect";
        return res.status(401).json({ message });
      }

      const token = jwt.sign({ userId: user.id }, privateKey.privateKey, {
        expiresIn: "24h",
      });

      const message =
        "Vous vous etes bien identifié - Merci de récupérer le token pour vos futurs requetes sur l'API.";
      res.json({
        message,
        data: user,
        token,
      });
    } catch (error) {
      erreurCall(error, res);
    }
  } else {
    res
      .status(400)
      .json(
        "Demande de login annulée. Merci de renseigner votre email et votre mdp."
      );
  }
};

exports.register = async (req, res) => {
  if (req.body.password && req.body.email && req.body.type) {
    try {
      const emailUsed = await checkDuplicateEmail(req, res);
      if (!emailUsed) {
        const user = await User.create({
          email: req.body.email,
          type: req.body.type,
          password: bcrypt.hashSync(req.body.password, 8),
        });

        const message = "Création du compte ok";
        res.json({ message, user });

        //this.login( req, res, user, ' votre compte a bien été crée. Vous avez été directement authentifié. vous pouvez récupérer le token pour vos futur requetes sur l api');
      }
    } catch (error) {
      erreurCall(error, res);
    }
  } else {
    const message =
      " demande d'inscription échouée.Merci de renseigner tous les champs nécéssaires";
    res.status(400).json({ message });
  }
};
exports.getInfo = async (req, res) => {
  try {
    const id = res.locals.id;
    const user = await User.findByPk(id);
    const message = "vos infos ont bien été récupérées";
    res.json({
      message,
      user,
    });
  } catch (error) {
    erreurCall(error, res);
  }
};
