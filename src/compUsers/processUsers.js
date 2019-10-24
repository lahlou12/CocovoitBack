const colUsers = require("./modelsUsers");
const ObjectId = require("mongodb").ObjectID;
const bcrypt = require ("bcrypt");

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
        return new Promise ((resolve) =>{
            colUsers.deleteOne({_id, id}, (err, user) =>{
                if (!user) reject("le User est introuvable dans la base de données");
                if (err) reject("Erreur");
                resolve({message : "le User est supprimé!",})
            })
        })
    },

    authentificationUSerProcess : (mail, motDePasse) =>{
        return new Promise((resolve, reject) =>{
            colUsers.findOne({mail : mail}, (err, user) =>{
                if (!user) reject("le User est introuvable dans la base de données");
                if (err) reject("Erreur");

                var motDePasseValide= bcrypt.compareSync(motDePasse,user.motDePasse);
                if (!motDePasseValide) reject("Mot de passe invalide");
                else resolve({message : "connexion reussie"});
            })
        })
    }

}