import { types } from 'mobx-state-tree'
import { fetchData } from '@services/apiAccess'
import { createFunctionName } from './functionProcessors'


// Function which tries to get object from store by it's identifier
// If no object in store was found - fetch data from api endpoint
// identifier - id value
// collection - array of objects where we search object
// identifierField - name of field used as identifier in object model
// addFunction - function which puts received data from api endpoint to store
// apiEndpoint - URL to fetch data from
export const getOrLoadObject = (identifier, collection, identifierField='id', addFunction, apiEndpoint) => {
    const object = collection.find(obj => obj[identifierField] === identifier) || {}

    if (Object.keys(object).length === 0 && object.constructor === Object) {
        fetchData((data) => {addFunction(data)}, `${apiEndpoint}${identifier}/`)
    }

    return object
}

// Add dynamically named 'getOrLoad' function to model which will be composed with it
const createAsyncActions = (collection, addFunction, apiEndpoint, identifierField='id') => (
    types.model({}).views(self => ({
        [createFunctionName('getOrLoad', collection, false)](id) {
            return getOrLoadObject(id, self[collection], identifierField, self[addFunction], apiEndpoint)
        },
    }))
)

export default createAsyncActions
