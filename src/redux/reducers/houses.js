import axios from 'axios'

const initialState = {
    loading: null,
    houses: []
}

const GET_HOUSES = 'GET_HOUSES'

export default function(state = initialState,action) {
    switch(action.type) {
        case GET_HOUSES + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_HOUSES + '_FULFILLED':
            // console.log(action.payload)
            return {
                ...state,
                houses: action.payload,
                loading: false
            }
        case GET_HOUSES + '_PENDING':
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
export function getHouses() {
    return {
        type: GET_HOUSES,
        payload: axios.get('/api/houses').then(res => res.data)
    }
}