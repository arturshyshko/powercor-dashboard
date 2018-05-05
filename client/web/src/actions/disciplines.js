export const GET_DISCIPLINE_NAMES = 'GET_DISCIPLINE_NAMES'

export const getDisciplineNames = (data) => {
    return {
        type:GET_DISCIPLINE_NAMES,
        payload: data
    }
}
