import { types, getRoot } from 'mobx-state-tree'

import { safeProps } from '@services/attributesProcessors'
import { createFunctionName } from './functionProcessors'


// Function that creates async reference
// Try to find object in store and if there is no such object - fetch it using 'getOrLoad<Object>' function
// referencee - model type which is referenced
// loadFunction - function which will return object or fetch it from server if there is none
// store - name of store which has collection of 'referencee' model
// Currently only supports tree which has one collection of given 'referencee' type
const createAsyncReference = (referencee, loadFunction=null, store=null, identifierField='id') => {
    if (loadFunction === null) {
        // If no load function name was passed use default pattern - getOrLoad<Object>
        // referencee is mobx-state-tree instance -> has 'name' property
        loadFunction = createFunctionName('getOrLoad', referencee.name, true)
    }
    if (store === null) {
        // If no store name was passed use default pattern - <object>Store
        // referencee is mobx-state-tree instance -> has 'name' property
        store = referencee.name[0].toLowerCase() + referencee.name.slice(1) + 'Store'
    }

    return types.maybe(types.reference(referencee, {
        get(identifier, parent) {
            return safeProps(getRoot(parent), store)[loadFunction](identifier)
        },

        set(value) {
            return value[identifierField]
        }
    }))
}

export default createAsyncReference
