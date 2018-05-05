export const GET_MANAGERS = 'GET_MANAGERS'

export const getManagers = (data) => {
    return{
    type: GET_MANAGERS,
    payload: data,
    }
}
