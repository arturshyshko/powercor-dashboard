import { types } from 'mobx-state-tree'

import createAllActions from '@store/helpers'

import { API_IMPORTANCES, API_RESOURCES, API_STAGES, API_STATUSES } from '@constants/apiUrls'


const Choice = types.model('Choice', {
    name: types.identifier,
    weight: types.number,
}).preProcessSnapshot(snapshot => ({
    name: snapshot.choice,
    weight: snapshot.weight,
}))

export const BusinessImportanceChoice = Choice.named('BusinessImportanceChoice')
export const ResourceChoice = Choice.named('ResourceChoice')
export const StageChoice = Choice.named('StageChoice')
export const StatusChoice = Choice.named('StatusChoice')

export const BusinessImportanceChoiceStore = types.compose(
    types.model('BusinessImportanceChoiceStore', {
        choices: types.array(BusinessImportanceChoice)
    }),
    createAllActions('choices', API_IMPORTANCES, 'name')
)

export const ResourceChoiceStore = types.compose(
    types.model('ResourceChoiceStore', {
        choices: types.array(ResourceChoice)
    }),
    createAllActions('choices', API_RESOURCES, 'name')
)

export const StageChoiceStore = types.compose(
    types.model('StageChoiceStore', {
        choices: types.array(StageChoice)
    }),
    createAllActions('choices', API_STAGES, 'name')
)

export const StatusChoiceStore = types.compose(
    types.model('StatusChoiceStore', {
        choices: types.array(StatusChoice)
    }),
    createAllActions('choices', API_STATUSES, 'name')
)
