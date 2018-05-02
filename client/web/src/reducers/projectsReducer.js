const initialState = []

const projectsReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'GET_PROJECTS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export default projectsReducer
