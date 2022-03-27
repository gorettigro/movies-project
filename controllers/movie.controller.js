const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');
// Models
const { Movie } = require('../models/movies.model');
const { Actor } = require('../models/actor.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');

// Get all movie
exports.getAllMovies = catchAsync(
    async (req, res, next) => {
        const movies = await Movie.findAll({
            where: { status: 'active' },
            include: [
                {
                    model: Actor,
                },
            ],
        });
    
        res.status(200).json({
            status: 'success',
            data: { movies },
        });
    });

// Get movie by id
exports.getMovieById = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;

	const movie = await Movie.findOne({ where: { id } });

	if (!movie) {
		return next(new AppError(`This movie doesn't exist`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: { movie },
	});
    });

// Create new movie
exports.createNewMovie = catchAsync(
  async (req, res, next) => {
    const { title, description, duration, rating, genre, actrs} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsg = errors
        .array()
        .map(({ msg }) => msg)
        .join('. ');
      return next(new AppError(400, errorMsg));
    }
  
    // Upload img to firebase
    const fileExtension = req.file.originalname.split('.')[1];
  
    const imgRef = ref(
      storage,
      `imgs/movies/${title}-${Date.now()}.${fileExtension}`
    );
  
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
  
    const newMovie = await Movie.create({
      title,
      description,
      duration,
      img: imgUploaded.metadata.fullPath,
      rating,
      genre});

    const actorsInMoviesPromises = actors.map(async (actorId) => {
      // Assign actors to newly created movie
      return await ActorInMovie.create({ actorId, movieId: newMovie.id });
    });
  
    await Promise.all(actorsInMoviesPromises);

    res.status(200).json({
      status: 'success',
      data: { newMovie }
    });
  });

// Update movie
exports.updateMovie = catchAsync(
    async (req, res, next) => {
        const { movie } = req;

        const data = filterObj(
          req.body,
          'title',
          'description',
          'duration',
          'rating',
          'genre'
        );
      
        await movie.update({ ...data });

	res.status(204).json({
		status: 'success',
	});
});

//Delete movie 
exports.deleteMovie = catchAsync(
    async (req, res) => {
      const { movie } = req;

      await movie.update({ status: 'deleted' });
    
      res.status(204).json({ status: 'success' });
    });