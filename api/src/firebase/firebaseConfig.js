const admin = require('firebase-admin');
const path = require('path');
// const serviceAccount = require(path.resolve(__dirname, './path/to/serviceAccountKey.json'));
// const serviceAccount = require('./path/to/serviceAccountKey.json');

// const firebaseConfig = () => {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: 'http://localhost:10000/favorite/', // Reemplaza con la URL de tu base de datos Firebase
//     });
// };

const firebaseConfig = () => {
    try {
        const serviceAccount = require(path.resolve(__dirname, './path/to/serviceAccountKey.json'));

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'http://localhost:10000/favorite/login', // Reemplaza con la URL de tu base de datos Firebase
        });

        // Ahora, `admin` está configurado y puedes usarlo para verificar tokens de Firebase
    } catch (error) {
        console.error('Error al inicializar Firebase:', error);
    }
}




module.exports = firebaseConfig;
