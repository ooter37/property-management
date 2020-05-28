import axios from 'axios'

const initialState = {
    loading: true,
    houses: [],
    selectedHouse: 0,
}

const GET_HOUSES = 'GET_HOUSES'
const SELECTED_HOUSE = 'SELECTED_HOUSE'

export default function(state = initialState,action) {
    switch(action.type) {
        case GET_HOUSES + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case GET_HOUSES + '_FULFILLED':
            // console.log(action.payload)
            // console.log('houses',state.houses)
            // console.log('select',state.selectedHouse)
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