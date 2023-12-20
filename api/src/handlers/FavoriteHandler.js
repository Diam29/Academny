const { addFavorite, listFavorites, removeFavorite, verifyFirebaseToken, generateJwtToken } = require('../controllers/FavoriteController')


// Handler para agregar un favorito
const addFavoriteHandler = async (req, res) => {
    console.log('soy req de handlerAdd', req)
    try {
        const result = await addFavorite(req);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error en el handler de agregar favorito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Handler para listar favoritos
const listFavoritesHandler = async (req, res) => {
    console.log('soy req de handlerList', req)
    try {
        const result = await listFavorites(req);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error en el handler de listar favoritos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Handler para quitar un favorito
const removeFavoriteHandler = async (req, res) => {
    console.log('soy req de handlerRemove', req)
    try {
        const result = await removeFavorite(req);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error en el handler de quitar favorito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Handler para iniciar sesión
// const loginHandler = async (req, res) => {
//     try {
//         const { firebaseToken } = req.body;

//         // Verifica el token de Firebase
//         const user = await verifyFirebaseToken(firebaseToken);

//         if (user) {
//             // Genera y envía el token JWT en la respuesta
//             const token = generateJwtToken(user.uid);
//             res.json({ token });
//         } else {
//             res.status(401).json({ error: 'Credenciales inválidas' });
//         }
//     } catch (error) {
//         console.error('Error en el handler de iniciar sesión:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// };

const loginHandler = async (req, res) => {
    try {
        const { firebaseToken } = req.body;

        console.log('Firebase Token recibido:', firebaseToken);

        // Resto del código...
    } catch (error) {
        console.error('Error en el handler de iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



module.exports = { addFavoriteHandler, listFavoritesHandler, removeFavoriteHandler, loginHandler };
