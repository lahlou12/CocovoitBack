const colItineraires = require("./modelsItineraires");
const processItineraires = require("./processItineraires");

module.exports ={

    publierItinerairesAction : (req, res) =>{

        var myItineraire = new colItineraires({
            idConducteur : req.body.idConducteur,
            adresseDepart  : req.body.adresseDepart.toUpperCase(),
            adresseArrive : req.body.adresseArrive.toUpperCase(),
            date : req.body.date,
            horaire : req.body.horaire, 
            nbPlacePropose : req.body.nbPlacePropose,
            prix : req.body.prix,
            description : req.body.description,
            fumer : req.body.fumer,
            animaux : req.body.animaux,
            manger : req.body.manger,
            
        });

        processItineraires.publierItinerairesProcess(myItineraire)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((errType) => {
            if (errType === "User introuvble dans la base de données") res.status(400).send("Le conducteur n'existe pas dans la base de données!");
            if (errType === "Erreur") res.status(400).send("Y a eu une erreur lors de la publication de l'itineraire")
        });
    },

    avoirItineraireAction : (req, res) =>{
        processItineraires.avoirItineraireProcess(req.params.id)
        .then((result)=>{
            res.status(200).json(result)
       })
        .catch((errType)=> {
            if (errType === "L'itinéraire est introuvble dans la base de données") res.status(400).send("L'itinéraire est introuvble dans la base de données!");
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche de l'itinéraire!")
        });
    },

    supprimerItineraireAction : (req, res) => {
        processItineraires.supprimerItineraireProcess(req.params.id)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((errType) =>{
            if (errType === "L'itinéraire est introuvable dans la base de données") res.status(404).send("L'itinéraire est introuvable dans la base de données!")
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche de l'itinéraire!")
        });
    },

    candidaterAUnItinerairesAction : (req, res) =>{
        idItineraire = req.params.id;
        idUser = req.body.iduser;
        
        processItineraires.candidaterAUnItinerairesProcess(idItineraire, idUser)
        .then((result) =>{
            res.status(200).json(result);
        })
        .catch((errType)=>{
            if (errType === "L'itinéraire est introuvble dans la base de données") res.status(400).send("L'itinéraire n'existe pas dans la base de données!")
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche de l'itinéraire!")
        })
    }, 

    accepter_refuserUneCandidatureAction : (req, res)=>{
        idItineraire = req.params.id;
        idUser = req.body.iduser;
        rep= req.params.reponse;

        processItineraires.accepter_refuserUneCandidatureProcess(idItineraire, idUser, rep)
        .then((result) =>{
            res.status(200).json(result);
        })
        .catch((errType)=>{
            if (errType === "L'itinéraire est introuvble dans la base de données") res.status(400).send("L'itinéraire n'existe pas dans la base de données!")
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche de l'itinéraire!")
            if (errType === "Erreur lors de l'envoi de mail!") res.status(400).send("Erreur lors de l'envoi de mail!")
            if (errType === "User introuvble dans la base de données") res.status(400).send("User introuvble dans la base de données!");
            if (errType === "Y a un problème lors de la recherche du User!") res.status(400).send("Y a un problème lors de la recherche du User!")
        })
    }, 

    chercherItinerairesAction : (req, res) =>{
        depart = req.params.depart.toUpperCase();
        arrive = req.params.arrive.toUpperCase();
        

        processItineraires.chercherItinerairesProcess(depart, arrive)
        .then((result) =>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch((errType)=>{
            if (errType === "Erreur") res.status(400).send("Y a un problème lors de la recherche de l'itinéraire!")
            if(errType =="N'y a aucun itineraire proposé entre ces deux ville!") res.status(400).send("N'y a aucun itineraire proposé entre ces deux ville!")
        })
    }
}