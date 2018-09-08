import { types } from 'mobx-state-tree'
import { Discipline } from '@store/discipline'


export const ApprovedVariation = types.model('ApprovedVariation', {
    id: types.identifierNumber,
    comment: types.optional(types.string, ''),
    actualCost: types.optional(types.number, 0.00),
    discipline: types.maybeNull(types.reference(Discipline)),
})


const ApprovedVariationStore = types.model('ApprovedVariationStore', {
    approvedVariations: types.array(ApprovedVariation)
}).views(self => ({

})).actions(self => {

    function addVariation(variation) {
        self.approvedVariations.push(variation)
    }

    return { addVariation, }
})

export default ApprovedVariationStore
