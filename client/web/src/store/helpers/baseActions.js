import { types } from 'mobx-state-tree'
import { addObjectToArray } from '@store/helpers'


const createFunctionName = (prefix, collection, isMultiple='false') => (
    prefix + collection[0].toUpperCase() + (isMultiple ? collection.slice(1, -1) : collection.slice(1))
)

const createBaseActions = (collection, findField) => (
    types.model({}).actions(self => ({
        [createFunctionName('add', collection)](object) {
            addObjectToArray(object, self.collection)
        }
    }))
)

export default createBaseActions
