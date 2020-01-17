const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const port = 3000; 
const dataBase = require('./dataBase');
const routeUsers = require('./src/compUsers/routesUsers');
const routeItineraires = require('./src/comipItineraires/routesItineraires');
const routeAvis = require('./src/compAvis/routesAvis');

var cors = require('cors')
app.use(cors())

// body parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route users
app.use('/users', routeUsers);

// route itineraires
app.use('/itineraires', routeItineraires),

// route avis
app.use('/avis', routeAvis);

//Connexion à la base de données.
dataBase.connection();

//Lancement du serveur
app.listen(port, ()=>{
    console.log('Express server listening on port : '+port);
})

module.exports= app;