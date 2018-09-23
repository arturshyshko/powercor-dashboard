import store from '@store'

import {API_MANAGERS } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'


export const fetchManagersData = (cb) => {
    fetchData(cb, API_MANAGERS)
}

export const setManagers = () => {
    fetchManagersData(store.managerStore.setManagers)
}
