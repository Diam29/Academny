const { Favorite } = require('../db')
const jwt = require('jsonwebtoken');
const firebaseAdmin = require('../firebase/firebaseConfig');

const addFavorite = async ({ body }) => {
    try {
        const { firebaseUser_id, service_id } = body

        const service = await Services.findByPk(service_id)
        if (!service) {
            // res.status(404).json({ error: 'Servicio no encontrado' })
            console.log('Error de Add controller')
            throw new Error('Servicio no encontrado');

        }

        const favorite = await Favorite.create({ firebaseUser_id, service_id })
        console.log('soy favorite de controller', favorite, 'soy service de controller', service)
        return favorite
    } catch (error) {
        console.error('Error al agregar favorito:', error)
        throw error
    }
}

// Controlador para listar favoritos
const listFavorites = async ({ user }) => {
    try {
        const { firebaseUserId } = user;

        // Obtener la lista de favoritos del usuario
        const favorites = await Favorite.findAll({
            where: { firebaseUserId },
            include: [{ model: Services, attributes: ['id', 'title', 'image'] }],
        });

        // res.status(200).json(favorites);
        return favorites
    } catch (error) {
        console.error('Error al listar favoritos:', error);
        // res.status(500).json({ error: 'Error interno del servidor' });
        throw error
    }
};

// Controlador para quitar un favorito
const removeFavorite = async ({ params }) => {
    try {
        const { favoriteId } = params;

        // Verificar si el favorito existe
        const favorite = await Favorite.findByPk(favoriteId);
        if (!favorite) {
            return { status: 404, message: ({ error: 'Favorito no encontrado' }) };
        }

        await favorite.destroy();

        // res.status(204).end();

        return { message: 'Servicio borrado con exito' }
    } catch (error) {
        console.error('Error al quitar favorito:', error);
        // res.status(500).json({ error: 'Error interno del servidor' });
        throw error
    }
};


// Ajusta la ruta según tu estructura

const verifyFirebaseToken = async (firebaseToken) => {
    try {
        // Verifica el token de Firebase
        const user = await firebaseAdmin.verifyIdToken(firebaseToken);
        return user;
    } catch (error) {
        console.error('Error al verificar el token de Firebase:', error);
        throw error;
    }
};

const generateJwtToken = (userId) => {
    // Genera el token JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};



module.exports = { addFavorite, listFavorites, removeFavorite, verifyFirebaseToken, generateJwtToken };