export const createFunctionName = (prefix, collection, isMultiple=false) => {
    let result = prefix + collection[0].toUpperCase()
    if (isMultiple === false) {
        return result + collection.slice(1, -1)
    } else {
        return result + collection.slice(1)
    }
}
