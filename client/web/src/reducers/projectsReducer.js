const initialState = {}

const projectsReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'GET_PROJECTS':
            return {
                ...state,
                ...action.payload
            }
    }
}

export default projectsReducer
