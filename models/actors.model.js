const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const actors = db.define(
	'actors',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(255),
		},
        country: {
			type: DataTypes.STRING(255),
		},
        rating: {
			type: DataTypes.STRING(255),
		},
		age: {
			type: DataTypes.NUMBER(3)
		},
        profilePic: {
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

module.exports = { actors };