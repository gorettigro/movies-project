const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');

// Models
const { Actor } = require('../models/actors.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');const { filterObj } = require('../util/filterObj');
const { filterObj } = require('../util/filterObj');
const { storage } = require('../util/firebase');
const { Movie } = require('../models/movies.model');

// Get all actors
exports.getAllUsers = catchAsync(
    async (req, res, next) => {
        const actors = await Actor.findAll({
            where: { status: 'active' },
            include: [
                {
                    model: Movie
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
      const { actor } = req;

      res.status(200).json({
        status: 'success',
        data: { actor },
      });
});

// Create new actor
exports.createNewActor = catchAsync(
  async (req, res, next) => {
  const { name, country, rating, age } = req.body;

	// Upload img to firebase
  const fileExtension = req.file.originalname.split('.')[1];

  const imgRef = ref(
    storage,
    `imgs/actors/${name}-${Date.now()}.${fileExtension}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic: imgUploaded.metadata.fullPath
  });

	res.status(201).json({
		status: 'success',
		data: { newActor },
	});
});

// Update 
exports.updateActor = catchAsync(
    async (req, res, next) => {
      const { actor } = req;
      const data = filterObj(req.body, 'name', 'country', 'rating', 'age');

      await actor.update({ ...data });
    
      res.status(204).json({ status: 'success' });
});

//Delete Actor 
exports.deleteActor = catchAsync(
    async (req, res) => {
      const { actor } = req;

      await actor.update({ status: 'deleted' });
    
      res.status(204).json({ status: 'success' });
	});