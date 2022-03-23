const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Reviews = db.define(
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
			allowNull: false
		},
        comment: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        rating: {
			type: DataTypes.NUMBER(255),
			allowNull: false,
			defaultValue: 1
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

module.exports = { Reviews };