const mongoose = require('mongoose');
const Schema =mongoose.Schema;

var avisSchema = new Schema (
    {
     idTrajet : { Type : String, require : true},
     idUserNotant : { Type : String , require : true},
     idUserNote : { Type : String, require : true},
     note : { Type : Number, require : true},
     commentaire : { Type : String, require : true},
     date : { Type : Date, require : true}
    }
);

module.exports = mongoose.model('avis', avisSchema);