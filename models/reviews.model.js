const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const reviews = db.define(
	'reviews',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		tittle: {
			type: DataTypes.STRING(255),
		},
        comment: {
			type: DataTypes.STRING(255),
		},
        rating: {
			type: DataTypes.NUMBER(255),
		},
		status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'pending',
		},
        userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        movieId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{ timestamps: false }
);

module.exports = { reviews };