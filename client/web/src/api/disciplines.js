import {API_DISCIPLINES } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchDisciplinesData = (cb) => {
    fetchData(cb, API_DISCIPLINES)
}