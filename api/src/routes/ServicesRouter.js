const { Router } = require('express')

const { ServicesCreated, hanlderAllServices, handlerServicesByName, handlerServicesByCategory, handlerDeleteService, updateServices } = require('../handlers/ServicesHandlers.js')

const servicesRouter = Router()

servicesRouter.post('/createService', ServicesCreated)
servicesRouter.get('/', hanlderAllServices)
servicesRouter.get('/title', handlerServicesByName)
servicesRouter.get('/category', handlerServicesByCategory)
servicesRouter.delete('/:id', handlerDeleteService)
servicesRouter.put('/:id', updateServices);


module.exports = servicesRouter;