const dotenv = require('dotenv');

// Models
const { Movie } = require('../models/movies.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

// Get all movie
exports.getAllMovies = catchAsync(
    async (req, res, next) => {});

// Get movie by id
exports.getMovieById = catchAsync(
    async (req, res, next) => {});

// Create new movie
exports.createNewMovie = catchAsync(
  async (req, res, next) => {});

// Update movie
exports.updateMovie = catchAsync(
    async (req, res, next) => {});

//Delete movie 
exports.deleteMovie = catchAsync(
    async (req, res) => {});