import store from '@store'
import { ApprovedVariation } from '@store/approvedVariation'


export const setVariations = (data) => {
    data.map(obj => {
        let variation = ApprovedVariation.create({
            id: obj.id,
            comment: obj.comment,
            actualCost: obj.actualCost,
            discipline: obj.discipline,
        })
        store.approvedVariationStore.addVariation(variation)
    })
}