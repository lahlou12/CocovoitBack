const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/dbCoCoVoit';

module.exports = {
    connection : ()=>{
        mongoose.connect(mongoDB);
        mongoose.Promise=global.Promise;
        const bd = mongoose.connection;

        bd.on('error', console.error.bind(console, 'Login error to the database'));
        bd.once('open', ()=>{
            console.log('Successful connection to the data base');
        })
    }
}