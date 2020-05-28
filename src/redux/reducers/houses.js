import axios from 'axios'

const initialState = {
    loading: null,
    houses: [],
    selectedHouse: 0,
    contractors: [],
    selectedContractor: 0
}

const GET_HOUSES = 'GET_HOUSES'
const SELECTED_HOUSE = 'SELECTED_HOUSE'
const GET_CONTRACTORS = 'GET_CONTRACTORS'
const SELECTED_CONTRACTOR = 'SELECTED_CONTRACTOR'

export default function(state = initialState,action) {
    switch(action.type) {
        case GET_HOUSES + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_HOUSES + '_FULFILLED':
            return {
                ...state,
                houses: action.payload,
                loading: false,
                selectedHouse: state.selectedHouse === 0 ? action.payload[0] : state.selectedHouse
            }
        case GET_HOUSES + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case SELECTED_HOUSE:
            // console.log(action.payload)
            return {
                ...state,
                selectedHouse: action.payload,
                loading: false
            }
        case GET_CONTRACTORS + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_CONTRACTORS + '_FULFILLED':
            return {
                ...state,
                contractors: action.payload,
                loading: false,
                selectedContractor: state.selectedContractor === 0 ? action.payload[0] : state.selectedContractor
            }
        case GET_CONTRACTORS + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case SELECTED_CONTRACTOR:
            // console.log(action.payload)
            return {
                ...state,
                selectedContractor: action.payload,
                loading: false
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
export function setSelectedHouseRedux(selected) {
    return {
        type: SELECTED_HOUSE,
        payload: selected
    }
}
export function getContractors() {
    return {
        type: GET_CONTRACTORS,
        payload: axios.get('/api/contractors').then(res => res.data)
    }
}
export function setSelectedContractor(selected) {
    return {
        type: SELECTED_CONTRACTOR,
        payload: selected
    }
}