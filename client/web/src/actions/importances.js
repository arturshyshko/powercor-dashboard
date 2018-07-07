export const GET_IMPORTANCES = 'GET_IMPORTANCES'

export const getImportances = (data) => {
    return {
        type: GET_IMPORTANCES,
        payload: data,
    }
}