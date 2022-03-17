const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const users = db.define(
	'users',
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		userName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
        email: {
			type: DataTypes.STRING(255),
			unique: true
		},
        password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'pending',
		},
        role: {
			type: DataTypes.STRING(10),
			allowNull: false,
		}
	},
	{ timestamps: false }
);

module.exports = { users };