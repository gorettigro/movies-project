const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Actor = db.define(
	'actors',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        country: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        rating: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		age: {
			type: DataTypes.NUMBER(3),
			allowNull: false
		},
        profilePic: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'pending',
		}
	},
	{ timestamps: false }
);

module.exports = { Actor };