export const createFunctionName = (prefix, collection, includeLastCharacter=false) => {
    let result = prefix + collection[0].toUpperCase()
    if (includeLastCharacter === false) {
        return result + collection.slice(1, -1)
    } else {
        return result + collection.slice(1)
    }
}
