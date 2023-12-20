const { Router } = require('express')
const { authenticateUser } = require('../middleware/authMiddleware')
const { addFavoriteHandler, listFavoritesHandler, removeFavoriteHandler, loginHandler } = require('../handlers/FavoriteHandler')

const favoriteRouter = Router()

favoriteRouter.post('/login', loginHandler);
favoriteRouter.post('/add', authenticateUser, addFavoriteHandler);

// Ruta para listar favoritos
favoriteRouter.get('/list', authenticateUser, listFavoritesHandler);

// Ruta para quitar un favorito
favoriteRouter.delete('/remove/:favoriteId', authenticateUser, removeFavoriteHandler);


module.exports = favoriteRouter