const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var userSchema = new Schema (
    {
        prenom : {type : String, require : true},
        nom : {type : String, require : true},
        dateNaissance :  {type : String, require : true},
        mail : {type : String, require : true},
        motDePasse : {type : String, require : true},
        modelVoiture : {type : String, require : true},
        matricule : {type : String, require : true},
        biographie : {type : String, require: true},
        nbEtoile : {type : Number},
        nbTrajet : {type : Number},
        idTrajet : [],
        idAvis : []
    }
);

module.exports = mongoose.model('Users', userSchema);