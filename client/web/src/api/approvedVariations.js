import store from '@store'

import { API_VARIATIONS } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchVariationsData = (cb) => {
    fetchData(cb, API_VARIATIONS)
}

export const setVariations = () => {
    fetchVariationsData(store.approvedVariationStore.setVariations)
}
