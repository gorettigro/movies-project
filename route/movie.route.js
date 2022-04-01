const express = require('express');
const { body } = require('express-validator');

//Controllers
const { 
        getAllMovies,  
        updateMovie, 
        createNewMovie,
        deleteMovie, 
        getMovieById,
     } = require('../controllers/movie.controller')

//Middleware
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/validates.middleware');
const {createMovieValidators,validateResult} = require('../middlewares/validators.middleware');  
const { movieExists } = require('../middlewares/movies.middleware');

const { upload } = require('../util/multer');

const router = express.Router();

router.use(validateSession);

router.route('/')
    .get(getAllMovies)
    .post(
        protectAdmin,
        upload.single('img'),
         createMovieValidators,
        validateResult,
        createNewMovie)

router
    .use('/:id', this.movieExists)
    .route('/:id')
    .get(getMovieById)
    .patch(protectAdmin, updateMovie)
    .delete(protectAdmin, deleteMovie)

module.exports = {movieRouter: router}