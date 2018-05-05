export const GET_PROJECTS = 'GET_PROJECTS'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'

export const getProjects = (data) => {
    return{
    type: GET_PROJECTS,
    payload: data,
    }
}

export const updateProject = (data) => {
    return {
        type: UPDATE_PROJECT,
        payload: data
    }
}
