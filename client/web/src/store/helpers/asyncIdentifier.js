import { types, getRoot } from 'mobx-state-tree'
import { Manager } from '@store/manager'


export const asyncReference = types.maybe(
    types.reference(Manager, {
        get(identifier, parent) {
            return getRoot(parent).managerStore.getOrLoadManager(identifier)
        },

        set(value) {
            return value.id
        }
    })
)

export const createAsyncReference = (referencee, store, loadFunction, identifierType='id') => (
    types.maybe(types.reference(referencee, {
        get(identifier, parent) {
            return getRoot(parent)[store][loadFunction](identifier)
        },

        set(value) {
            return value[identifierType]
        }
    }))
)
