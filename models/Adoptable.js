const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Adoptable extends Model { }

Adoptable.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          age: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          
          description: {
            type: DataTypes.STRING,
          },
          animal_type: {
            type: DataTypes.INTEGER,
            references: {
                model: 'animals',
                key: 'id',
            },
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            }
          }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'adoptable',
    }
);

module.exports = Adoptable;