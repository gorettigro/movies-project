const express = require('express');

//Controllers
const { 
        getAllMovies,  
        updateMovie, 
        createNewMovie,
        deleteMovie, 
        getMovieById,
     } = require('../controllers/movie.controller')

const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(createNewMovie)

router.route('/:id')
    .get(getMovieById)
    .patch(updateMovie)
    .delete(deleteMovie)

module.exports = {movieRouter: router}