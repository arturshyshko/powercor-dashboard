import {API_MANAGERS } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchManagersData = (cb) => {
    fetchData(cb, API_MANAGERS)
}
