import { types } from 'mobx-state-tree'
import { fetchData } from '@services/apiAccess'
import { createFunctionName } from './functionProcessors'


export const getOrLoadObject = (identifier, collection, identifierField='id', addFunction, apiEndpoint) => {
    const object = collection.find(obj => obj[identifierField] === identifier) || {}

    if (Object.keys(object).length === 0 && object.constructor === Object) {
        fetchData((data) => {addFunction(data)}, `${apiEndpoint}${identifier}/`)
    }

    return object
}

const createAsyncActions = (collection, addFunction, apiEndpoint, identifierField='id') => (
    types.model({}).views(self => ({
        [createFunctionName('getOrLoad', collection, false)](id) {
            return getOrLoadObject(id, self[collection], identifierField, self[addFunction], apiEndpoint)
        },
    }))
)

export default createAsyncActions
