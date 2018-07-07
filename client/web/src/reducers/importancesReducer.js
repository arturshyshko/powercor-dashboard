import { GET_IMPORTANCES } from '../actions/importances'

const initialState = []

const importancesReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_IMPORTANCES:
            return [...action.payload]

        default:
            return state
    }
}

export default importancesReducer
