const express = require('express');

//Controllers
const { 
        getAllActors,  
        updateActor, 
        createNewActor,
        deleteActor, 
        getActorById,
     } = require('../controllers/actor.controller')

const router = express.Router();

router.route('/')
    .get(getAllActors)
    .post(createNewActor)

router.route('/:id')
    .get(getActorById)
    .patch(updateActor)
    .delete(deleteActor)

module.exports = {actorRouter: router}