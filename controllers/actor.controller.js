const dotenv = require('dotenv');

// Models
const { Actor } = require('../models/actors.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

// Get all actors
exports.getAllUsers = catchAsync(
    async (req, res, next) => {});

// Get actors by id
exports.getActorById = catchAsync(
    async (req, res, next) => {});

// Create new actor
exports.createNewActor = catchAsync(
  async (req, res, next) => {});

// Update 
exports.updateActor = catchAsync(
    async (req, res, next) => {});

//Delete Actor 
exports.deleteActor = catchAsync(
    async (req, res) => {
	});