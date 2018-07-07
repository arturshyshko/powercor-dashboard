import { API_IMPORTANCES } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchImportancesData = (cb) => {
    fetchData(cb, API_IMPORTANCES)
}
