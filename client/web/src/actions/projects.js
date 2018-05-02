export const GET_PROJECTS = 'GET_PROJECTS'

export const fetchProjects = (data) => {
    return{
    type: GET_PROJECTS,
    payload: data,
    }
}
