const jwt = require("jsonwebtoken");
const privateKey = require("../config/private-key");
const { User } = require("../models/db");

module.exports = async ( req, res, next) => {
    console.log("Requete pour page protégée");
    const token = req.headers["x-access-token"];

    if(!token) {
        const message="Vous n'avez pas fourni de jeton d'authentification";
        return res.status(401).json({message});
    }

    jwt.verify (
        token,
        privateKey.privateKey,
        async(error,decodedToken) => {
            if(error) {
                const message = " L'utilisateur n'est pas autorisé à acceder à cette page";
                return res.status(401).json({message, data : error.message});
            }

            const userId = decodedToken.userId;
            const user_from_token = await User.findByPk(userId);
            if(!user_from_token) {
                const mesge = " votre compte n'existe plus. Vous n'est pas autorisé à accéder à cette page";
                return res.status(401).json({message});
            }
            res.locals.id = userId
        }
    )
}