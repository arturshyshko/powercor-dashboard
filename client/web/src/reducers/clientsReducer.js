import { GET_CLIENTS } from '../actions/clients'

const initialState = []

const clientsReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_CLIENTS:
            return [...action.payload]

        default:
            return state
    }
}

export default clientsReducer
