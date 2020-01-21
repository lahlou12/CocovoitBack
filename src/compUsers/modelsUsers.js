const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var userSchema = new Schema (
    {
        prenom : {type : String, require : true},
        nom : {type : String, require : true},
        dateNaissance :  {type : String, require : true},
        mail : {type : String, require : true},
        motDePasse : {type : String, require : true},
        modelVoiture : {type : String},
        matricule : {type : String},
        biographie : {type : String, require: true},
        nbEtoile : {type : Number, default : 0},
        idTrajetConducteur : [],
        idTrajetPassager : [],
        idTrajetNote : [],
        idAvis : []
    }
);

module.exports = mongoose.model('Users', userSchema);