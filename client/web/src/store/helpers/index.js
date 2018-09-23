export const addObjectToArray = (object, destinationArray) => {
    destinationArray.push(object)
}

export const addObjectsToArray = (objects, destinationArray) => {
    objects.map(obj => {addObjectToArray(obj, destinationArray)})
}

export const setObjectToArray =(object, destinationArray, findField='id') => {
    let oldObject = destinationArray.find(arrayObj => arrayObj[findField] === object[findField])
    if (oldObject) {
        oldObject = object
    } else {
        addObjectToArray(object, destinationArray)
    }
}

export const setObjectsToArray = (objects, destinationArray, findField='id') => {
    objects.map(obj => {setObjectToArray(obj, destinationArray, findField)})
}
