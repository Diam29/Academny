const { Router } = require('express');
const servicesRouter = require('./ServicesRouter.js')
const favoriteRouter = require('./FavoriteRouter.js')

const router = Router();

router.use('/services', servicesRouter)
router.use('/favorite', favoriteRouter)



module.exports = router;
