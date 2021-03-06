const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
//const dotenv = require('dotenv');

// Models
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

dotenv.config({ path: './config.env' });

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: 'active' }
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, 'Credentials are invalid'));
  }

  const token = await jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET, // Secret key
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});

// Get all users
exports.getAllUsers = catchAsync(
    async (req, res, next) => {
        const users = await User.findAll({
          attributes: { exclude: ['password'] },
          where: { status: 'active' }
        });
    
        res.status(200).json({
            status: 'success',
            data: { users },
        });
    });

// Get user by id
exports.getUserById = catchAsync(
    async (req, res, next) => {
        const { user } = req;
    
        res.status(200).json({
            status: 'success',
            data: { user },
        });
    });

// Create new user
exports.createNewUser = catchAsync(
  async (req, res, next) => {
    const { username, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

	  const newUser = await User.create({ username, email, password: hashedPassword, role  });

	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
  });

// Update user
exports.updateUser = catchAsync(
    async (req, res, next) => {
      const { user } = req;

      const data = filterObj(req.body, 'username', 'email');
    
      await user.update({ ...data });
    
      res.status(204).json({ status: 'success' });
});

//Delete user
exports.deleteUser = catchAsync(
    async (req, res) => {
      const { user } = req;

      await user.update({ status: 'deleted' });
    
      res.status(204).json({ status: 'success' });
	});

    