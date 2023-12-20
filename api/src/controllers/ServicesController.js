const unorm = require('unorm');
const { Sequelize, Op } = require('sequelize')
const { Services } = require('../db.js')

// CREAR SERVICIOS

const createServices = async (title, image, video, smallDescription, price, bigDescription, category, link) => {

    try {
        const newServices = await Services.create({
            title,
            image,
            video,
            smallDescription,
            price,
            bigDescription,
            category,
            link
        })

        return newServices

    } catch (error) {
        console.log('error a crear el servicio', error.message)
        throw error
    }
}

// CARGAR TODOS LOS SERVICIOS

const getAllServices = async () => {

    const allServices = await Services.findAll()

    return allServices
}

// BUSCAR SERVICIOS POR TITULO

const normalizeString = (str) => unorm.nfkd(str).replace(/[^\w\s]/gi, '');

const getServicesByName = async (title) => {
    try {
        const normalizedTitle = normalizeString(title);

        const servicesByName = await Services.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('title')), {
                        [Op.iLike]: `%${normalizeString(normalizedTitle)}%`
                    }),
                ]
            }
        });


        if (!servicesByName || servicesByName.length === 0) {
            throw new Error(`No hay servicios de: ${title}`);
        }

        const service = servicesByName.map(tit => ({
            id: tit.id,
            title: tit.title,
            image: tit.image,
            video: tit.video,
            smallDescription: tit.smallDescription,
            price: tit.price,
            bigDescription: tit.bigDescription,
            category: tit.category,
            link: tit.link,
        }));

        return service;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

// BUSCAR SERVICIOS POR CATEGORIA

const getServicesByCategory = async (category) => {

    try {
        const normalizedCategory = normalizeString(category);

        const servicesByCategory = await Services.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('category')), {
                        [Op.iLike]: `%${normalizeString(normalizedCategory)}%`
                    }),
                ]
            }
        });

        if (!servicesByCategory || servicesByCategory.length === 0) {
            throw new Error(`No hay servicios de: ${category}`);
        }

        const categoryServices = servicesByCategory.map(cat => ({
            id: cat.id,
            title: cat.title,
            image: cat.image,
            video: cat.video,
            smallDescription: cat.smallDescription,
            price: cat.price,
            bigDescription: cat.bigDescription,
            category: cat.category,
            link: cat.link,
        }));

        return categoryServices;
    } catch (error) {
        console.log(`${error.message}`);
        throw error;
    }

}


const deleteServices = async (id) => {
    try {
        console.log('entre al controller de delete')
        const service = await Services.findByPk(id)

        if (!service) throw new Error('El servicio que busca no se encuentra')

        await service.destroy()

        return { message: 'Servicio borrado con exito' }
    } catch (error) {
        console.log('Error al borrar el servicio:', error.message)
        throw error;
    }
}

// Modificar datos de Services


const updateService = async (id, data) => {
    try {
        const service = await Services.findByPk(id);

        if (!service) {
            throw new Error('Servicio no encontrado');
        }

        service.title = data.title;
        service.image = data.image;
        service.video = data.video;
        service.smallDescription = data.smallDescription;
        service.price = data.price;
        service.bigDescription = data.bigDescription;
        service.category = data.category;
        service.link = data.link;

        await service.save();

        return { message: 'Servicio actualizado con éxito' };
    } catch (error) {
        console.log('Error al actualizar el servicio:', error.message);
        throw error;
    }
};




module.exports = { createServices, getAllServices, getServicesByName, getServicesByCategory, deleteServices, updateService }