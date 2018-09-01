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
