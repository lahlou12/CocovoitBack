const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const port = 3000; 
const dataBase = require('./dataBase');
const routeUsers = require('./src/compUsers/routesUsers');
const routeItineraires = require('./src/comipItineraires/routesItineraires');
const routeAvis = require('./src/compAvis/routesAvis');

//Définition des CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
        res.setHeader ("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "*");
      
        //res.Header("Access-Control-Allow-Origin","http://localhost:3030/user/login");
        
        next();
});

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