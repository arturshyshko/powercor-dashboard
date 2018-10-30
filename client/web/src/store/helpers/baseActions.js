import { types } from 'mobx-state-tree'
import { createFunctionName } from './functionProcessors'


export const addObjectToArray = (object, destinationArray) => {
    destinationArray.push(object)
}

export const addObjectsToArray = (objects, destinationArray) => {
    objects.forEach(obj => {addObjectToArray(obj, destinationArray)})
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
    objects.forEach(obj => {setObjectToArray(obj, destinationArray, findField)})
}


const createBaseActions = (collection, findField='id') => (
    types.model({}).actions(self => ({

        // Create function with 'addObject' pattern
        [createFunctionName('add', collection, false)](object) {
            return addObjectToArray(object, self[collection])
        },

        // Create function with 'addObjects' pattern
        [createFunctionName('add', collection, true)](data) {
            return addObjectsToArray(data, self[collection])
        },

        // Create function with 'setObject' pattern
        [createFunctionName('set', collection, false)](object) {
            return setObjectToArray(object, self[collection], findField)
        },

        // Create function with 'setObjects' pattern
        [createFunctionName('set', collection, true)](data) {
            return setObjectsToArray(data, self[collection], findField)
        },
    }))
)

export default createBaseActions
