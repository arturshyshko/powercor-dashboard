import store from '@store'

import { API_CLIENTS } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchClientsData = (cb) => {
    fetchData(cb, API_CLIENTS)
}

export const setClients = () => {
    fetchClientsData(store.clientStore.setClients)
}
