const express = require("express");
const router = express.Router();
const actionAvis = require("./actionsAvis");

// Ajouter un avis
router.post('/', actionAvis.ajouterAvisAction);

// Avoir un avis
router.get('/:id', actionAvis.avoirAvisAction);

// Supprimer un avis
router.delete('/:id',);

module.exports = router;