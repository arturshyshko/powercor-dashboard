import { types } from 'mobx-state-tree'

import { createFunctionName } from './functionProcessors'
import createBaseActions from './baseActions'
import createAsyncActions from './asyncActions'

const createAllActions = (collection, apiEndpoint, identifierField='id') => (
    types.compose(
        createBaseActions(collection, identifierField),
        createAsyncActions(
            collection,
            createFunctionName('set', collection, false),
            apiEndpoint,
            identifierField
        ),
    )
)

export { default as createBaseActions } from './baseActions'
export { default as createAsyncActions } from './asyncActions'

export default createAllActions
