import { GET_PROJECTS, UPDATE_PROJECT } from '../actions/projects'

const initialState = []

const projectsReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_PROJECTS:
            return [...action.payload]

        case UPDATE_PROJECT:
            return state.map(project => (
                project['network'] === action.payload.network
                    ? action.payload
                    : project
                )
            )

        default:
            return state
    }
}

export default projectsReducer
