const colUsers = require("./modelsUsers");
const processUsers = require("./processUsers");
const bcrypt = require("bcrypt");

module.exports = {

    ajouterUserAction : (req, res) => {
        
        const pwd = bcrypt.hashSync(req.body.motDePasse, 8);
        
        var myUser = new colUsers({
            prenom : req.body.prenom,
            nom : req.body.nom,
            dateNaissance :  req.body.dateNaissance,
            mail : req.body.mail,
            motDePasse : pwd,
            modelVoiture : req.body.modelVoiture,
            matricule : req.body.matricule,
            biographie : req.body.biographie
        });

        processUsers.ajouterUserProcess(myUser)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(400).send("Y a erreur lors de l'ajout du User!");
        });
    },

    avoirUserAction : (req, res) =>{
        processUsers.avoirUserProcess(req.params.id)
        .then((result)=>{
            res.status(200).json(result)
       })
        .catch((errType)=> {
            if (errType === "User introuvble dans la base de données") res.status(400).send("User introuvble dans la base de données!");
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche du User!")
        });
    },

    supprimerUserAction : (req, res) =>{
        processUsers.supprimerUserProcess(req.params.id)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((errType) =>{
            if (errType === "le User est introuvable dans la base de données") res.status(404).send("le User est introuvable dans la base de données")
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche du User!")
        });
    },
    
    authentificationUserAction : (req, res) =>{
        const mail = req.params.mail;
        const motDePasse = req.params.motdepasse;
        
        processUsers.authentificationUSerProcess(mail, motDePasse)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((errType) =>{
            if (errType === "le User est introuvable dans la base de données") res.status(404).send("le User est introuvable dans la base de données");
            if (errType === "Erreur") res.status(500).send("Y a un problème lors de la recherche du User!");
            if (errType === "Mot de passe invalide") res.status(401).send("Mot de passe invalide")
        })
    }

}