const colUsers = require("./modelsUsers");
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require ("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {

    ajouterUserProcess : (myUser) => {
        return new Promise((resolve, reject) =>{
            colUsers.findOne({mail : myUser.mail}, (err, user)=> {
                if (err) reject('Erreur');
                if (!user){
                    myUser.save((err, user1) =>{
                        if (err) reject("Erreur");
                        resolve({message: "L'ajout du User est effectué avec succés!", user1});
                    })
                }else{
                    resolve({message : "Un autre User est déjà inscrit avec la même adresse mail!"});
                }
            })      
        })
    },

    avoirUserProcess : (id) =>{
        return new Promise((resolve,reject)=>{
            colUsers.findOne({_id: id}, (err, user)=> {
                if (!user) reject("User introuvble dans la base de données");
                if (err) reject("Erreur");
                resolve({user});
            });
        });
    },

    supprimerUserProcess : (id) =>{
        return new Promise ((resolve) => {
            colUsers.deleteOne({_id: ObjectId(id)}, (err, user) =>{
                if (!user) reject("Le User est introuvable dans la base de données");
                if (err) reject("Erreur");
                resolve({message : "Le User est supprimé!",})
            })
        })
    },

    modifierUserProcess : (myUser, res) => {
        return new Promise((resolve, reject) => {
            colUsers.findOne({_id: idUser}, (err, user)=> {
                if (!user) reject("Le User est introuvable dans la base de données");
                if (err) reject("Erreur");
                else{
                    user.prenom = myUser.prenom;
                    user.nom = myUser.note;
                    user.dateNaissance = myUser.dateNaissance;
                    user.motDePasse = myUser.motDePasse;
                    user.modelVoiture = myUser.modelVoiture;
                    user.matricule = myUser.matricule;
                    user.biographie = myUser.biographie;

                    user.save((err, user)=>{
                        if (err) if (err) reject("Erreur");
                        resolve({message : "Les informations du user ont bien été mises à jour!"})
                    })
                }
            })
        })
    },

    authentificationUSerProcess : (mail, motDePasse) =>{
        return new Promise((resolve, reject) =>{
            colUsers.findOne({mail : mail}, (err, user) =>{
                if (!user) reject("Le User est introuvable dans la base de données");
                if (err) reject("Erreur");

                var motDePasseValide= bcrypt.compareSync(motDePasse,user.motDePasse);
                if (!motDePasseValide) reject("Mot de passe invalide");
                else {
                    const token =  jwt.sign({
                        email : user.mail,
                        userId : user._id
                        }, 
                        "secret",{
                        expiresIn: "1h"
                    })
                    resolve({message : "connexion reussie", token : token});
                }
            })
        })
    },

    ajoutId_Trajet_TrajetNote_AvisProcess : (idUser, objet, cle) =>{
        return new Promise((resolve, reject) => {
            colUsers.findOne({_id: idUser}, (err, user)=> {
                if (!user) reject("User introuvble dans la base de données");
                if (err) reject("Erreur");
                if(user){
                    if (cle == "idTrajet"){
                        user.idTrajetConducteur.push(String(objet.id));
                    }
                    if (cle == "idAvis"){
                        note = ((user.nbEtoile*user.idAvis.length)+objet.note)/(user.idAvis.length+1)
                        user.nbEtoile=note;
                        user.idAvis.push(String(objet.id));
                    }
                    if (cle == "idAvisNote"){
                        user.idTrajetNote.push(String(objet.id));
                    }
                    user.save((err, user1) =>{
                        if (err) reject("Erreur");
                        if (user1) resolve({message: "l'id du trajet a bien été ajouté!"});
                    })
                }
            })
        })
    },

    ajoutIdTrajetPassager : (idUser, idItineraire) =>{
        return new Promise((resolve, reject) => {
            colUsers.findOne({_id: idUser}, (err, user)=> {
                if (!user) reject("User introuvble dans la base de données");
                if (err) reject("Erreur");
                if(user){
                    user.idTrajetPassager.push(idItineraire)
                    user.save((err, user1) =>{
                        if (err) reject("Erreur");
                        if (user1) resolve({message: "l'id du trajet a bien été ajouté!"});
                    })
                }
            })
        })
    }

}