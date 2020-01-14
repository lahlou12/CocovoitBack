const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var avisSchema = new Schema (
    {
     idTrajet : { type : String, require : true},
     idUserNotant : { type : String , require : true},
     idUserNote : { type : String, require : true},
     note : { type : Number, require : true},
     commentaire : { type : String},
     date : { type : Date, require : true}
    }
);

module.exports = mongoose.model('avis', avisSchema);
