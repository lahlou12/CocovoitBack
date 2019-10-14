const express = require('express');
const app = express();
const port = 3000; 
const dataBase = require('./dataBase');
const routeUsers = require('./src/compUsers/routesUsers');
const routeItineraires = require('./src/comipItineraires/routesItineraires');
const routeAvis = require('./src/compAvis/routesAvis');

// 
app.use('/users', routeUsers);

//
app.use('/itineraires', routeItineraires),

//
app.use('/avis', routeAvis);

//Connexion à la base de données.
dataBase.connection();

//Lancement du serveur
app.listen(port, ()=>{
    console.log('Express server listening on port : '+port);
})