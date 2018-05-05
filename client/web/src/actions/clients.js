export const GET_CLIENTS = 'GET_CLIENTS'

export const getClients = (data) => {
    return{
    type: GET_CLIENTS,
    payload: data,
    }
}
