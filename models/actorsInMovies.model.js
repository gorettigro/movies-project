const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

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
		},
        movieId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
);

module.exports = { ActorsInMovies };