export const camelizeKeys = (object) => {
    if (Array.isArray(object)) {
        return object.map(v => camelizeKeys(v))
    } else if (object !== null && object.constructor === Object) {
        return Object.keys(object).reduce(
            (result, key) => ({
                ...result,
                [camelizeKey(key)]: camelizeKeys(object[key]),
            }),
            {},
        )
    }
    return object
}

const camelizeKey = (key) => (
    key.replace(/_([a-z])/, v => v[1].toUpperCase())
)
