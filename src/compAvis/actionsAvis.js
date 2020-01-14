const colAvis = require("./modelsAvis");
const processAvis = require("./processAvis");

module.exports = {

    ajouterAvisAction : (req, res) =>{
        var myAvis = new colAvis({
            idTrajet : req.body.idTrajet,
            idUserNotant : req.body.idUserNotant,
            idUserNote : req.body.idUserNote,
            note : req.body.note,
            commentaire : req.body.commentaire,
            date : req.body.date
        });

        processAvis.ajouterAvisProcess(myAvis)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((errType) =>{
            //faut revoir les codes des status // pas sûr que ca soit 400 pour les deux derniere arreurs
            if (errType =="Erreur") res.status(400).send("Y a eu une erreur lors de l'ajout de l'avis!");
            if (errType =="L'itinéraire n'existe pas dans la base de données!") res.status(400).send("L'itinéraire n'existe pas dans la base de données!");
            if (errType =="User introuvble dans la base de données") res.status(400).send("User n'exite pas dans la base de données");
        })
    },

    avoirAvisAction : (req, res) =>{
        processAvis.avoirAvisProcess(req.params.id)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((errType) =>{
            if (errType == "L'avis est introuvble dans la base de données") res.status.send("L'avis est introuvble dans la base de données!")
            if (errType == "Erreur") res.status.send("Y a un problème lors de la recherche de l'itinéraire!")
        });
    },

    //supprimerAvisAction : (req, res) => {
    //    processAvis.supprimerAvisProcess(req.params.id)
    //    .then((result)=>{
    //        res.status(200).json(result);
    //    })
    //    .catch((errType) =>{
    //        if (errType === "L'avis est introuvable dans la base de données") res.status(404).send("L'avis est introuvable dans la base de données!")
    //        if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche de l'avis!")
    //    });
    //},
}