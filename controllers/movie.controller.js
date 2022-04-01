const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Movie } = require('../models/movies.model');
const { Actor } = require('../models/actors.model');
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
        const { movie } = req;

        res.status(200).json({
          status: 'success',
          data: { movie },
          });
    });

// Create new movie
exports.createNewMovie = catchAsync(
  async (req, res, next) => {
    const { title, description, duration, rating, genre, actors} = req.body;
  
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
      return await ActorsInMovies.create({ actorId, movieId: newMovie.id });
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