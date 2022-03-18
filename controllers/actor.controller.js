const dotenv = require('dotenv');

// Models
const { Actor } = require('../models/actors.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

dotenv.config({ path: './config.env' });

// Get all actors
exports.getAllUsers = catchAsync(
    async (req, res, next) => {
        const actors = await Actor.findAll({
            where: { status: 'pending' },
            include: [
                {
                    model: Actor,
                    attributes: { exclude: ['password'] },
                },
            ],
        });
    
        res.status(200).json({
            status: 'success',
            data: { actors },
        });
    });

// Get actors by id
exports.getActorById = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;

	const actors = await Actor.findOne({ where: { id } });

	if (!actors) {
		return next(new AppError(`This Actor doesn't exist`, 404));
	}

	res.status(200).json({
		status: 'success',
		data: { actors },
	});
});

// Create new actor
exports.createNewActor = catchAsync(
  async (req, res, next) => {
    const { name, country, age } = req.body;

	const newActor = await Actor.create({ name, country, age  });

	res.status(201).json({
		status: 'success',
		data: { newActor },
	});
  });

// Update 
exports.updateActor = catchAsync(
    async (req, res, next) => {
        const { id } = req.params;
	    const { name, country, age } = req.body;

	const actor = await Actor.findOne({ where: { id } });

	if (!actor) {
		return next(new AppError('This Actor does not exists', 404));
	}

	await actor.update({ name, country, age });

	res.status(204).json({
		status: 'success',
	});
});

//Delete Actor 
exports.deleteActor = catchAsync(
    async (req, res) => {
        try {
            const { id } = req.params;
        
            const actor = await Actor.findOne({
              where: { id: id, status: 'active' }
            });
        
            if (!actor) {
              res.status(404).json({
                status: 'error',
                message: 'Cant delete actor, invalid ID'
              });
              return;
            }
        
            await actor.update({ status: 'deleted' });
        
            res.status(204).json({ status: 'success' });
          } catch (error) {
            console.log(error);
          }
	});