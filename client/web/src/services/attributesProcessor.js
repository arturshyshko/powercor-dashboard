export const camelizeKeys = (object) => {
    if (Array.isArray(object)) {
        return object.map(v => camelizeKeys(v))
    } else if (object !== null && object.constructor === Object) {
        return Object.keys(object).reduce(
            (result, key) => ({
                ...result,
                [_camelizeKey(key)]: camelizeKeys(object[key]),
            }),
            {},
        )
    }
    return object
}

export const filterKeys = (object, allowed) => (
    Object.keys(object)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) =>{
            return {
                ...obj,
                [key]: object[key]
            }
        }, {})
)

const _camelizeKey = (key) => (
    key.replace(/_([a-z])/, v => v[1].toUpperCase())
)
