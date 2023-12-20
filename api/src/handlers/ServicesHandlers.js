const { createServices, getAllServices, getServicesByName, getServicesByCategory, deleteServices, updateService } = require('../controllers/ServicesController')

const ServicesCreated = async (req, res) => {
    const { title, image, video, smallDescription, price, bigDescription, category, link } = req.body
    try {
        const newServices = await createServices(
            title,
            image,
            video,
            smallDescription,
            price,
            bigDescription,
            category,
            link)
        res.status(200).json(newServices)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const hanlderAllServices = async (req, res) => {

    try {
        const allService = await getAllServices()
        res.status(200).json(allService)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const handlerServicesByName = async (req, res) => {
    const { title } = req.query
    try {
        const serviceByName = await getServicesByName(title)
        res.status(200).json(serviceByName)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const handlerServicesByCategory = async (req, res) => {
    const { category } = req.query
    try {
        const serviceByCategory = await getServicesByCategory(category)
        res.status(200).json(serviceByCategory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const handlerDeleteService = async (req, res) => {
    const { id } = req.params
    console.log('entre al delete de handler')
    try {
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID de servicio no valido' })
        }

        const result = await deleteServices(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const updateServices = async (req, res) => {
    const { id } = req.params;
    const { title, image, video, smallDescription, price, bigDescription, category, link } = req.body;

    try {
        const result = await updateService(id, {
            title,
            image,
            video,
            smallDescription,
            price,
            bigDescription,
            category,
            link,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




module.exports = { ServicesCreated, hanlderAllServices, handlerServicesByName, handlerServicesByCategory, handlerDeleteService, updateServices }