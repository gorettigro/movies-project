const express = require('express');
const { body } = require('express-validator');

//Controllers
const { 
        getAllActors,  
        updateActor, 
        createNewActor,
        deleteActor, 
        getActorById,
     } = require('../controllers/actor.controller');

//Midleware
const { validateSassion, protectAdmin } = require('../middleware/validates.middleware');
const {
    createActorValidators,
    validateResult
  } = require('../middlewares/validators.middleware');
const { actorExists } = require('../middlewares/actors.middleware');

const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router.route('/')
    .get( getAllActors)
    .post(protectAdmin, 
            upload.single('img'),
            createActorValidators,
            validateResult,
            createNewActor
    );

router.use('/:id', actorExists)
    .route('/:id')
    .get(getActorById)
    .patch(protectAdmin, updateActor)
    .delete(protectAdmin, deleteActor)

module.exports = {actorRouter: router}