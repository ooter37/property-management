import axios from 'axios'

const initialState = {
    data: null,
    loading: null,
    // houses: []
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const REQUEST_USER_DATA = 'REQUEST_USER_DATA'
// const GET_HOUSES = 'GET_HOUSES'

export default function(state = initialState,action) {
    switch(action.type) {
        case REGISTER_USER + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case REGISTER_USER + '_FULFILLED':
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case REGISTER_USER + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case LOGIN_USER + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER + '_FULFILLED':
            return {
                ...state,
                data: action.payload.data,
                loading: false
            }
        case LOGIN_USER + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case LOGOUT_USER + '_PENDING':
            return {
                data: null,
                loading: true
            }
        case LOGOUT_USER + '_FULFILLED':
            return {
                ...state,
                data: null,
                loading: false
            }
        case LOGOUT_USER + '_REJECTED':
            return {
                ...state,
                loading: false
            }
        case REQUEST_USER_DATA + '_FULFILLED':
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case REQUEST_USER_DATA + '_PENDING':
            return {
                ...state,
                loading: true
            }
        // case GET_HOUSES + '_REJECTED':
        //     return {
        //         ...state,
        //         loading: false
        //     }
        // case GET_HOUSES + '_FULFILLED':
        //     // console.log(action.payload)
        //     return {
        //         ...state,
        //         houses: action.payload,
        //         loading: false
        //     }
        // case GET_HOUSES + '_PENDING':
        //     return {
        //         ...state,
        //         loading: true
        //     }
        default:
            return state
    }
}
// export function getHouses() {
//     return {
//         type: GET_HOUSES,
//         payload: axios.get('/api/houses').then(res => res.data)
//     }
// }
export function requestUserData(){
    return {
        type: REQUEST_USER_DATA,
        payload: axios.get('/auth/user-data').then(res => res.data)
    }
}
export function register(user) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register', user)
    }
}
export function login(user) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', user)
    }
}
export function logout(){
    return {
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout')
    }
}