const dotenv = require('dotenv');

// Models
const { Movie } = require('../models/movies.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

// Get all movie
exports.getAllMovies = catchAsync(
    async (req, res, next) => {
        const movies = await Movie.findAll({
            where: { status: 'pending' },
            include: [
                {
                    model: Movie,
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
    const { title, description, duration, img, genre } = req.body;

	const newMovie = await Movie.create({ title, description, duration, img, genre });

	res.status(201).json({
		status: 'success',
		data: { newMovie },
	});
  });

// Update movie
exports.updateMovie = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;
	    const { title, description, duration, img } = req.body;

	const movie = await Movie.findOne({ where: { id } });

	if (!movie) {
		return next(new AppError('This movie does not exists', 404));
	}

	await movie.update({  title, description, duration, img, genre });

	res.status(204).json({
		status: 'success',
	});
});

//Delete movie 
exports.deleteMovie = catchAsync(
    async (req, res) => {
        try {
            const { id } = req.params;
        
            const movie = await Movie.findOne({
              where: { id: id, status: 'active' }
            });
        
            if (!movie) {
              res.status(404).json({
                status: 'error',
                message: 'Cant delete movie, invalid ID'
              });
              return;
            }
        
            await movie.update({ status: 'deleted' });
        
            res.status(204).json({ status: 'success' });
          } catch (error) {
            console.log(error);
          }
    });