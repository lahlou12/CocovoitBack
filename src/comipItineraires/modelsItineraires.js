const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itineraireSchema = new Schema (
    {
     idConducteur : {Type : String, require : true},
     idPassagers : [],
     pointDepart  : {
        longitude : {Type : String, require : true},
        latitude : {Type : String, require : true} 
        },
     pointArrive : {
        longitude : {Type : String, require : true},
        latitude : {Type : String, require : true} 
        },
     date : { Type : Date, require : true },
     horaire : { Type : String, require : true }, 
     nbPlacePropose : { Type : Number, require : true},
     prix : { Type : String, require :  true},
     description : { Type : String, require : true},
     fuemr : { Type : Boolean, require : true},
     animaux : { Type : Boolean, require : true},
     amnger : { Type : Boolean, require : true},
     idAvis : []
    }
);

module.exports = mongoose.model('itineraire', itineraireSchema);