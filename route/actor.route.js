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
const { actorExists } = require('../middlewares/actors.middleware');

const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router.route('/')
    .get( getAllActors)
    .post(protectAdmin, 
            upload.single('img'),
        [
            body('name').isString().notEmpty(),
            body('country')
                .isString()
                .withMessage('Country must be a string')
                .notEmpty()
                .withMessage('Must provide a valid country name'),
            body('rating')
                .isNumeric()
                .withMessage('Rating must be a number')
                .custom((value) => value > 0 && value <= 5)
                .withMessage('Rating must be between 1 and 5'),
            body('age')
                .isNumeric()
                .withMessage('Age must be a number')
                .custom((value) => value > 0)
                .withMessage('Age must be greater than 0')
        ],
        createNewActor
    );

router.use('/:id', actorExists)
    .route('/:id')
    .get(getActorById)
    .patch(protectAdmin, updateActor)
    .delete(protectAdmin, deleteActor)

module.exports = {actorRouter: router}