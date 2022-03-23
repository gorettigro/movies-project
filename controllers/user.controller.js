const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/users.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

// Get all users
exports.getAllUsers = catchAsync(
    async (req, res, next) => {
        const users = await User.findAll({
            where: { status: 'pending' },
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                },
            ],
        });
    
        res.status(200).json({
            status: 'success',
            data: { users },
        });
    });

// Get user by id
exports.getUserById = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;
    
        const users = await User.findOne({ where: { id } });
    
        if (!users) {
            return next(new AppError(`This User doesn't exist`, 404));
        }
    
        res.status(200).json({
            status: 'success',
            data: { users },
        });
    });

// Create new user
exports.createNewUser = catchAsync(
  async (req, res, next) => {
    const { username, email, password } = req.body;

	const newUser = await User.create({ username, email, password  });

	res.status(201).json({
		status: 'success',
		data: { newUser },
	});
  });

// Update user
exports.updateUser = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;
	    const { username, email } = req.body;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return next(new AppError('This user does not exists', 404));
	}

	await user.update({ username, email });

	res.status(204).json({
		status: 'success',
	});
});

//Delete user
exports.deleteUser = catchAsync(
    async (req, res) => {
        try {
            const { id } = req.params;
        
            const userr = await User.findOne({
              where: { id: id, status: 'active' }
            });
        
            if (!user) {
              res.status(404).json({
                status: 'error',
                message: 'Cant delete user, invalid ID'
              });
              return;
            }
        
            await user.update({ status: 'deleted' });
        
            res.status(204).json({ status: 'success' });
          } catch (error) {
            console.log(error);
          }
	});

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
        );
      
        res.status(200).json({
          status: 'success',
          data: { token }
        });
      });