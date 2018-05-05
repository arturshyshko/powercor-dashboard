import { GET_DISCIPLINE_NAMES } from '../actions/disciplines'

const initialState = []

const disciplinesReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_DISCIPLINE_NAMES:
            return [...action.payload]

        default:
            return state
    }
}

export default disciplinesReducer
