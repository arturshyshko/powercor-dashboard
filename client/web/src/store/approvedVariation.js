import { types } from 'mobx-state-tree'

import createAllActions from '@store/helpers'
import asyncReference from '@store/helpers/asyncIdentifier'

import { API_VARIATIONS } from '@constants/apiUrls'

import { Discipline } from '@store/discipline'


export const ApprovedVariation = types.model('ApprovedVariation', {
    id: types.identifierNumber,
    comment: types.optional(types.string, ''),
    actualCost: types.optional(types.number, 0.00),
    discipline: asyncReference(Discipline),
}).preProcessSnapshot(snapshot => ({
    id: snapshot.id,
    comment: snapshot.comment,
    actualCost: snapshot.actualCost,
    discipline: snapshot.discipline,
}))


const ApprovedVariationStore = types.compose(
    types.model('ApprovedVariationStore', {
        variations: types.array(ApprovedVariation)
    }).views(self => ({
        getDisciplineVariations(discipline) {
            return self.variations.filter(variation => variation.discipline.id === discipline.id)
        },
    })),
    createAllActions('variations', API_VARIATIONS)
)

export default ApprovedVariationStore
