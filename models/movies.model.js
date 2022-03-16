const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const movies = db.define(
	'movies',
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
        description: {
			type: DataTypes.STRING(255),
		},
        duration: {
			type: DataTypes.NUMBER(5),
		},
        rating: {
			type: DataTypes.NUMBER(5),
		},
        img: {
			type: DataTypes.STRING(255),
		},
        genere: {
			type: DataTypes.STRING(255),
		},
		status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'pending',
		}
	},
	{ timestamps: false }
);

module.exports = { movies };