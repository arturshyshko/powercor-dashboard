import { types } from 'mobx-state-tree'
import createBaseActions from '@store/helpers'

import { Discipline } from '@store/discipline'


export const ApprovedVariation = types.model('ApprovedVariation', {
    id: types.identifierNumber,
    comment: types.optional(types.string, ''),
    actualCost: types.optional(types.number, 0.00),
    discipline: types.maybeNull(types.reference(Discipline)),
}).preProcessSnapshot(snapshot => ({
    id: snapshot.id,
    comment: snapshot.comment,
    actualCost: snapshot.actualCost,
    discipline: snapshot.discipline,
}))


const ApprovedVariationStore = types.compose(
    types.model('ApprovedVariationStore', {
        variations: types.array(ApprovedVariation)
    }),
    createBaseActions('variations')
)

export default ApprovedVariationStore
