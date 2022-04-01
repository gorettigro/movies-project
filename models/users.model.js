const { DataTypes } = require('sequelize');
const { db } = require('../util/database');

const Users = db.define(
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
			allowNull: false,
			unique: true
		},
        password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: 'active',
		},
        role: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'guest'
		}
	},
);

module.exports = { Users };