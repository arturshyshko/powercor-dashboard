import { types } from 'mobx-state-tree'
import { addObjectToArray, addObjectsToArray, setObjectToArray, setObjectsToArray } from '@store/helpers/baseActions'


const createFunctionName = (prefix, collection, isMultiple=false) => {
    let result = prefix + collection[0].toUpperCase()
    if (isMultiple === false) {
        return result + collection.slice(1, -1)
    } else {
        return result + collection.slice(1)
    }
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