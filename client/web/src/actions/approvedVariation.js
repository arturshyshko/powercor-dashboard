import store from '@store'
import { ApprovedVariation } from '@store/approvedVariation'


export const setVariations = (data) => {
    data.map(obj => {
        let variation = ApprovedVariation.create({
            id: `${obj.id}`,
            name: obj.name,
            actualCost: obj.actualCost,
            discipline: `${obj.discipline}`,
        })
        store.approvedVariationStore.addVariation(variation)
    })
}