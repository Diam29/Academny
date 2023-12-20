const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Services', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
        },
        video: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
        },
        smallDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        bigDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
        {
            timestamps: false
        }
    )
}

