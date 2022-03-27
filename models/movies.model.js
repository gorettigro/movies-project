const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Movies = db.define(
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
			allowNull: false
		},
        description: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        duration: {
			type: DataTypes.NUMBER(5),
			allowNull: false,
			defaultValue: 0
		},
        rating: {
			type: DataTypes.NUMBER(5),
			allowNull: false,
			defaultValue: 1
		},
        img: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        genere: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'active',
		}
	},
	{ timestamps: false }
);

module.exports = { Movies };