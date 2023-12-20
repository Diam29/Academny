const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Favorite', {
        favorte_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncremental: true,
        },
        firebaseUser_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Services',
                key: 'id',
            },
            allowNull: false,
        }
    })
}