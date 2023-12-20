import axios from 'axios'
import { toast } from 'react-hot-toast'

// const url = 'http://localhost:3001/'
const url = 'https://academia-online-back.onrender.com/'

const instance = axios.create({
    withCredentials: true,
    credentials: 'include',
});

// MOSTRAR TODOS LOS SERVICIOS

export const GET_SERVICES = 'GET_SERVICES'

export const getAllServices = () => {
    return async (dispatch) => {
        try {
            const allServices = (await instance.get(`${url}services`)).data
            console.log('soy allServices de actions', allServices)

            return dispatch({
                type: GET_SERVICES,
                payload: allServices
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const GET_SERVICES_BY_NAME = 'GET_SERVICES_BY_NAME'

export const getServicesByName = (title) => {
    return async (dispatch) => {
        try {
            const servicesByName = (await instance.get(`${url}services//title?title=${title}`)).data
            return dispatch({
                type: GET_SERVICES_BY_NAME,
                payload: servicesByName
            })
        } catch (error) {
            console.log(error.message)
            toast.error(`No hay cursos de "${title}"`)
        }
    }
}

export const GET_SERVICES_BY_CATEGORY = 'GET_SERVICES_BY_CATEGORY'

export const getServicesByCategory = (category) => {
    console.log('categoria', category)
    return async (dispatch) => {
        try {
            const servicesByCategory = (await instance.get(`${url}services/category?category=${category}`)).data
            console.log('entre a actions de getServicesByCategory', servicesByCategory)
            return dispatch({
                type: GET_SERVICES_BY_CATEGORY,
                payload: servicesByCategory
            })
        } catch (error) {
            console.log(error.message)
            toast.error(`No hay cursos de "${category}"`)
        }
    }
}

export const FILTER_BY_NAME = 'FILTER_BY_NAME'

export const filterByName = (title) => ({
    type: FILTER_BY_NAME,
    payload: title
})

export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'

export const filterByCategory = (category) => ({
    type: FILTER_BY_CATEGORY,
    payload: category
})
