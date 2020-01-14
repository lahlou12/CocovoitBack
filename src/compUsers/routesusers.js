const express = require("express");
const router = express.Router();
const actionUsers = require("./actionsUsers");

// ajouter un user
router.post('/', actionUsers.ajouterUserAction);

// avoir un user
router.get('/:id', actionUsers.avoirUserAction);

// supprimer un user
router.delete('/:id', actionUsers.supprimerUserAction);

// authentifier un user
router.post('/login', actionUsers.authentificationUserAction);

// mettre a jour les informations d'un user
//router.put('/', "");

module.exports = router;