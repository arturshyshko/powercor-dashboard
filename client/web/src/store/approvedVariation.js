import { types } from 'mobx-state-tree'
import { Discipline } from '@store/discipline'


export const ApprovedVariation = types.model('ApprovedVariation', {
    id: types.identifier,
    comment: types.string,
    actualCost: types.number,
    discipline: types.reference(Discipline)
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
