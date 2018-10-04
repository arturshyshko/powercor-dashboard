import { types } from 'mobx-state-tree'
import { createBaseActions } from '@store/helpers'


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
    createBaseActions('choices', 'name')
)

export const ResourceChoiceStore = types.compose(
    types.model('ResourceChoiceStore', {
        choices: types.array(ResourceChoice)
    }),
    createBaseActions('choices', 'name')
)

export const StageChoiceStore = types.compose(
    types.model('StageChoiceStore', {
        choices: types.array(StageChoice)
    }),
    createBaseActions('choices', 'name')
)

export const StatusChoiceStore = types.compose(
    types.model('StatusChoiceStore', {
        choices: types.array(StatusChoice)
    }),
    createBaseActions('choices', 'name')
)
