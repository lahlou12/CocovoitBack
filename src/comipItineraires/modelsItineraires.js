const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itineraireSchema = new Schema (
    {
     idConducteur : {type : String, require : true},
     idPassagers : [],
     idPassagersCandidats : [],
     adresseDepart  : {type : String, require : true},
     adresseArrive : {type : String, require : true},
     date : { type : Date, require : true },
     horaire : { type : String, require : true }, 
     nbPlacePropose : { type : Number, require : true},
     prix : { type : String, require :  true},
     description : { type : String, require : true},
     fumer : { type : Boolean, require : true},
     animaux : { type : Boolean, require : true},
     manger : { type : Boolean, require : true},
     idAvis : []
   });

module.exports = mongoose.model('itineraire', itineraireSchema);