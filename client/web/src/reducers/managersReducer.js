import { GET_MANAGERS } from '../actions/managers'

const initialState = []

const managersReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_MANAGERS:
            return [...action.payload]

        default:
            return state
    }
}

export default managersReducer
