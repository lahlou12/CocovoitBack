const colItineraires = require("./modelsItineraires");
const processUsers = require("../compUsers/processUsers");
//const email_config = require("../../email_config");
const ObjectId = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');

const cocovoitMail = nodemailer.createTransport({
    service: 'gmail',
    //port : 25,
    auth: {
        user: 'cocovoitevry@gmail.com',
        pass: 'LahlouAmine12'
    }
});

var mailOptions = {
    from: 'cocovoitevry@gmail.com',
    to: "",
    subject: "CocoVoit - Réponse - Candidature",
    text: "",
};


module.exports = {

    publierItinerairesProcess : (myItineraire) =>{
        return new Promise((resolve, reject) =>{
            processUsers.avoirUserProcess(myItineraire.idConducteur)
            .then((resultt)=>{
                myItineraire.save((err, itineraire) =>{
                    if (err) reject('Erreur');
                    else {
                        processUsers.ajoutId_Trajet_TrajetNote_AvisProcess(itineraire.idConducteur, itineraire, "idTrajet")
                        .then((result) =>{
                            resolve({message : "L'itinéraire a bien été publié", itineraire : itineraire});
                        })
                        .catch((errType) =>{
                            if(errType === "User introuvble dans la base de données") reject("Le conducteur n'existe pas dans la base de données")
                            if(errType === "Erreur") reject("Erreur")
                        })
                        
                    }
                });
            })
            .catch((errType) =>{
                if(errType === "User introuvble dans la base de données") reject("User introuvble dans la base de données")
                if(errType === "Erreur") reject("Erreur")
            })
        });
    },

    avoirItineraireProcess : (id) =>{
        return new Promise((resolve,reject)=>{
            colItineraires.findOne({_id: id}, (err, itineraire)=> {
                if (!itineraire) reject("L'itinéraire est introuvble dans la base de données");
                if (err) reject("Erreur");
                resolve({itineraire});
            });
        });
    },

    supprimerItineraireProcess : (id) =>{
        return new Promise ((resolve) =>{
            colItineraires.deleteOne({_id: ObjectId(id)}, (err, itineraire) =>{
                if (!itineraire) reject("L'itinéraire est introuvable dans la base de données");
                if (err) reject("Erreur");
                resolve({message : "L'itinéraire est supprimé!",})
            })
        })
    },

    ajoutIdAvisProcess : (idItineraire, idAvis) =>{
        return new Promise((resolve, reject)=>{
            colItineraires.findOne({_id: ObjectId(idItineraire)}, (err, itineraire)=>{
                if (!itineraire) reject("L'itinéraire est introuvble dans la base de données");
                if (err) reject("Erreur");
                if(itineraire) {
                    itineraire.idAvis.push(idAvis);
                    itineraire.save((err, itineraire1)=>{
                        if (err) reject("Erreur");
                        if (itineraire1) resolve({itineraire1});
                    })
                }
            })
        })
    },
    
    candidaterAUnItinerairesProcess : (idItineraire, idUser) =>{
        return new Promise((resolve, reject)=>{
            colItineraires.findOne({_id: ObjectId(idItineraire)}, (err, itineraire)=>{
                if (!itineraire) reject("L'itinéraire est introuvble dans la base de données");
                if (err) reject("Erreur");
                if (itineraire){
                    if(itineraire.nbPlacePropose >= itineraire.idPassagers.length){
                        itineraire.idPassagersCandidats.push(idUser)
                        itineraire.save((err, itineraire1)=>{
                            if (err) reject("Erreur");
                            if (itineraire1){
                                resolve({message : "La candidature a bien été transmise!"})
                            }
                        })
                    }else{
                        resolve({message: "N'y a plus de place disponible!"});
                    }
                    
                }
            })
        })
    },

    accepter_refuserUneCandidatureProcess : (idItineraire, idUser, rep) => {
        return new Promise((resolve, reject)=>{
            colItineraires.findOne({_id: ObjectId(idItineraire)}, (err, itineraire)=>{
                if (!itineraire) reject("L'itinéraire est introuvble dans la base de données");
                if (err) reject("Erreur");
                if(itineraire){
                    processUsers.avoirUserProcess(idUser)
                    .then((result)=>{
                        mailOptions.to = result.user.mail;
                        if(rep == "true"){
                            mailOptions.text= "Votre candidature a bien été acceptée!";
                            itineraire.idPassagers.push(idUser);
                        }else{
                            mailOptions.text= "Votre candidature a été refusée!";
                        }

                        itineraire.save((err, itineraire1)=>{
                            if (err) reject("Erreur");
                            if (itineraire1){
                                cocovoitMail.sendMail(mailOptions, (err, info)=>{
                                    if(err) reject("Erreur lors de l'envoi de mail!")
                                    if(info){
                                        processUsers.ajoutIdTrajetPassager(idUser, idItineraire)
                                        .then((result)=>{
                                            resolve({itineraire1});
                                        })
                                        .catch((errType)=>{
                                            if(errType === "Erreur") reject("Erreur")
                                            if(errType === "User introuvble dans la base de données") reject("User introuvble dans la base de données")
                                        })
                                        
                                    } 
                                })
                            } 
                        })
                    })
                    .catch((errType)=>{
                        if (errType === "User introuvble dans la base de données") reject("User introuvble dans la base de données!");
                        if (errType === "Erreur") reject("Y a un problème lors de la recherche du User!")
                    })
                }
            })
        })
    },

    chercherItinerairesProcess : (depart, arrive) =>{
        return new Promise((resolve,reject)=>{
            //colItineraires.find({adresseDepart : { $regex : "/.*"+depart+"*./"}, adresseArrive : { $regex : "/.*"+arrive+"*./"}}, (err, itineraire)=> {
            colItineraires.find({adresseDepart : { $regex: depart }, adresseArrive : { $regex: arrive }}, (err, itineraire)=> {
                if (!itineraire) reject("N'y a aucun itineraire proposé entre ces deux ville!");
                if (err) reject("Erreur");
                //console.log(itineraire)
                resolve({itineraire});
            });
        });
    }
}