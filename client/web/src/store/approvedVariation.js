import { types } from 'mobx-state-tree'
import { Discipline } from '@store/discipline'


export const ApprovedVariation = types.model('ApprovedVariation', {
    id: types.identifierNumber,
    comment: types.optional(types.string, ''),
    actualCost: types.optional(types.number, 0.00),
    discipline: types.maybeNull(types.reference(Discipline)),
})


const ApprovedVariationStore = types.model('ApprovedVariationStore', {
    variations: types.array(ApprovedVariation)
}).views(self => ({

})).actions(self => ({

    parseVariation(obj) {
        return ApprovedVariation.create({
            id: obj.id,
            comment: obj.comment,
            actualCost: obj.actualCost,
            discipline: obj.discipline,
        })
    },

    addVariation(object) {
        self.variations.push(self.parseVariation(object))
    },

    addVariations(data) {
        data.map(variation => {
            self.addVariation(variation)
        })
    },

    setVariation(variation) {
        // Replace old instance if the id's are the same
        // Add new one if there are no variations with this id
        let oldVariation = self.variations.find(obj => obj.id === variation.id)
        if (oldVariation) {
            self.oldVariation = self.parseVariation(variation)
        } else{
            self.addVariation(variation)
        }
    },

    setVariations(data) {
        data.map(variation => {
            self.setVariation(variation)
        })
    },

}))

export default ApprovedVariationStore
