export const camelizeKeys = (object) => (
    changeKeysCasing(object, (key) => (
        key.replace(/_([a-z])/g, v => v[1].toUpperCase())
    ))
)

export const decamelizeKeys = (object) => (
    changeKeysCasing(object, (key) => (
        key.replace(/([A-Z])/g, v => '_' + v[0].toLowerCase())
    ))
)

// Function to change casing of the keys
// It just goes through object recursively and applies passed function
const changeKeysCasing = (object, keyProcessor) => {
    if (Array.isArray(object)) {
        return object.map(v => changeKeysCasing(v, keyProcessor))
    } else if (object !== null && object.constructor === Object) {
        return Object.keys(object).reduce(
            (result, key) => ({
                ...result,
                [keyProcessor(key)]: changeKeysCasing(object[key], keyProcessor),
            }),
            {},
        )
    }
    return object
}

// Return new object only will allowed attributes
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

export const safeProps = (obj, path, def = '') => {
    if (obj == null) {
        return def
    }
    const keys = path.split('.')
    return Object.keys(obj).indexOf(keys[0]) >= 0
        ? keys.length > 1
            ? safeProps(obj[keys[0]], keys.slice(1).join('.'), def)
            : obj[keys[0]]
                ? obj[keys[0]]
                : def
            : def
}


