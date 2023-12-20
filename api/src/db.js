const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
} = process.env;


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false,
    native: false,
    ssl: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    pool: {
        max: 5055,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});


// const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        const modelDefiner = require(path.join(__dirname, '/models', file));
        modelDefiner(sequelize);
    });

const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Services } = sequelize.models;
const { Favorite } = sequelize.models

const { Pool } = require('pg');

const pool = new Pool({
    user: 'academiaonline_user',
    host: 'dpg-cln4n19r6k8c73ab8oc0-a.oregon-postgres.render.com',
    database: 'academiaonline',
    password: 'Ewemt7PgTkkoESxJ3zQv5NWLZkzvbqvN',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect((err, client) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
    } else {
        console.log('Conexión exitosa a la base de datos');
        client.release();
    }
});

pool.on('error', (err) => {
    console.error('Error en el pool de conexiones:', err);
});


Services.hasMany(Favorite, { foreignKey: 'service_id' })
Favorite.belongsTo(Services, { foreignKey: 'service_id' })


module.exports = { ...sequelize.models, Services, Favorite, conn: sequelize };