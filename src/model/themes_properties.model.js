const { DataTypes } = require('sequelize');
const { sequelize } = require("../connection");

const Theme_PropertiesModel = sequelize.define('Theme_Properties',{
    id: {
        type:DataTypes.INTEGER,
        allowNull: false, primaryKey: true, autoIncrement: true,
    },
    create_date: { type: DataTypes.DATE, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    keywords: { type: DataTypes.STRING, allowNull: true },
    owner_user_id: { type: DataTypes.INTEGER, allowNull: false },
    
}, {
    tableName: 'themes_Properties',
    timestamps: false
});

module.exports = {
    Theme_PropertiesModel
};