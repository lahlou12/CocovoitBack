const express = require("express");
const router = express.Router();
const actionItineraires = require("./actionsItineraires");

// publier un itinéraire
router.post('/', actionItineraires.publierItinerairesAction);

// avoir un itinéraire
router.get('/:id', actionItineraires.avoirItineraireAction);

// supprimer un itinéraire 
router.delete('/:id', actionItineraires.supprimerItineraireAction);

// mettre à jour un itinéraire // candidater a un itinéraire
router.put('/:id', actionItineraires.candidaterAUnItinerairesAction);

// accepter ou refuser une candidature 
router.put('/:id/:reponse', actionItineraires.accepter_refuserUneCandidatureAction)

// chercher un itinéraire avec sa ville de départ et sa ville d'arrivé
router.get('/:depart/:arrive', actionItineraires.chercherItinerairesAction)

module.exports = router;