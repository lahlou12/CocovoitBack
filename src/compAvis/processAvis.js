const colAvis = require("./modelsAvis");
const processUsers = require("../compUsers/processUsers");
const processItineraires = require("../comipItineraires/processItineraires");
const ObjectId = require('mongodb').ObjectID;

module.exports = {

    ajouterAvisProcess : (myAvis) =>{
        return new Promise((resolve, reject) =>{
            myAvis.save((err, avis)=>{
                if (err) reject('Erreur')
                else{
                    processUsers.ajoutId_Trajet_TrajetNote_AvisProcess(avis.idUserNote, avis, "idAvis")
                    .then((result)=>{
                        processUsers.ajoutId_Trajet_TrajetNote_AvisProcess(avis.idUserNotant, avis, "idAvisNote")
                        .then((result=>{
                            processItineraires.ajoutIdAvisProcess(avis.idTrajet, avis.id)
                            .then((result=>{
                                resolve({message : "L'avis a bien été ajouté!", avis : avis});
                            }))
                            .catch((errType) =>{
                                if(errType === "L'itinéraire est introuvble dans la base de données") reject("L'itinéraire n'existe pas dans la base de données!")
                                if(errType === "Erreur") reject("Erreur")
                            })    
                        }))
                        .catch((errType) =>{
                            if(errType === "User introuvble dans la base de données") reject("User introuvble dans la base de données")
                            if(errType === "Erreur") reject("Erreur")
                        })
                    })
                    .catch((errType) =>{
                        if(errType === "User introuvble dans la base de données") reject("User introuvble dans la base de données")
                        if(errType === "Erreur") reject("Erreur")
                    })
                }
            })
        })
    },

    avoirAvisProcess : (id) =>{
        return new Promise((resolve,reject)=>{
            colAvis.findOne({_id: id}, (err, avis)=> {
                if (!avis) reject("L'avis est introuvble dans la base de données");
                if (err) reject("Erreur");
                resolve({avis});
            });
        });
    },
    
    //supprimerAvisProcess : (id) =>{
    //    return new Promise ((resolve) =>{
    //        colAvis.deleteOne({_id: ObjectId(id)}, (err, avis) =>{
    //            if (!avis) reject("L'avis est introuvable dans la base de données");
    //            if (err) reject("Erreur");
    //            resolve({message : "L'avis est supprimé!",})
    //        })
    //    })
    //},
}