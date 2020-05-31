import axios from 'axios'

const initialState = {
    loading: null,
    houses: [],
    selectedHouse: 0,
    contractors: [],
    selectedContractor: 0,
    renters: [],
    selectedRenter: 0,
    tasks: []
}

const GET_HOUSES = 'GET_HOUSES'
const SELECTED_HOUSE = 'SELECTED_HOUSE'
const GET_CONTRACTORS = 'GET_CONTRACTORS'
const SELECTED_CONTRACTOR = 'SELECTED_CONTRACTOR'
const GET_RENTERS = 'GET_RENTERS'
const SELECTED_RENTER = 'SELECTED_RENTER'
const GET_TASKS = 'GET_TASKS'

export default function(state = initialState,action) {
    // console.log('switch', action)
    switch(action.type) {
        case GET_HOUSES + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_HOUSES + '_FULFILLED':
            // console.log('payload houses',action.payload)
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
        case GET_RENTERS + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_RENTERS + '_FULFILLED':
            return {
                ...state,
                renters: action.payload,
                loading: false,
                selectedRenter: state.selectedRenter === 0 ? action.payload[0] : state.selectedRenter
            }
        case GET_RENTERS + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case SELECTED_RENTER:
            // console.log(action.payload)
            return {
                ...state,
                selectedRenter: action.payload,
                loading: false
            }
        case GET_TASKS + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_TASKS + '_FULFILLED':
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            }
        case GET_TASKS + '_PENDING':
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
export function getRenters() {
    return {
        type: GET_RENTERS,
        payload: axios.get('/api/renters').then(res => res.data)
    }
}
export function setSelectedRenter(selected) {
    return {
        type: SELECTED_RENTER,
        payload: selected
    }
}
export function getTasks() {
    return {
        type: GET_TASKS,
        payload: axios.get('/api/tasks').then(res => res.data)
    }
}
// export function getTasks() {
//     return {
//         type: GET_TASKS,
//         payload: axios.get('/api/houses').then(res => res.data)
//     }
// }