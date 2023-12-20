import { GET_SERVICES, GET_SERVICES_BY_CATEGORY, GET_SERVICES_BY_NAME } from "./actions";

const initialState = {
    allServices: [],
    servicesByName: [],
    servicesByCategory: [],

}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_SERVICES:
            return { ...state, allServices: action.payload };
        case GET_SERVICES_BY_NAME:
            return { ...state, servicesByName: action.payload }

        case GET_SERVICES_BY_CATEGORY:
            return { ...state, servicesByCategory: action.payload }
        default:
            return state;
    }

}


export default reducer;