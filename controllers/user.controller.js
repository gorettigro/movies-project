const dotenv = require('dotenv');

// Models
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

// Get all users
exports.getAllUsers = catchAsync(
    async (req, res, next) => {});

// Get user by id
exports.getUserById = catchAsync(
    async (req, res, next) => {});

// Create new user
exports.createNewUser = catchAsync(
  async (req, res, next) => {});

// Update user
exports.updateUser = catchAsync(
    async (req, res, next) => {});

//Delete user
exports.deleteUser = catchAsync(
    async (req, res) => {
	});