const { DataTypes } = require('sequelize');
const { db } = require('../util/database');

// Models
const { Actor } = require('./actors.models');
const { Movie } = require('./movies.models');

const ActorsInMovies = db.define(
	'actorsInMovies',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		actorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Actor,
				key: 'id'
			  }
		},
        movieId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Movie,
				key: 'id'
			  }
		}
	},
);

module.exports = { ActorsInMovies };