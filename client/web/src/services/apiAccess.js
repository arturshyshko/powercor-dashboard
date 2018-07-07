import axios from './httpClient'
import * as apiUrls from '../constants/apiUrls'


export const fetchData = (cb, url) => {
    axios({
        method: 'GET',
        url: url,

    }).then(response => {

        cb(response.data)

    }).catch(error => {
        console.log(error)
    })
}

export const updateObject = (data, cb, url, id) => {
    axios.patch(
        url + id + '/',
        data
    ).then(response => {
        cb(response.data)
    }).catch(error => {
        console.log(error)
    })
}

export const fetchResourcesData = (cb) => {
    fetchData(cb, apiUrls.API_RESOURCES)
}

export const fetchStagesData = (cb) => {
    fetchData(cb, apiUrls.API_STAGES)
}

export const fetchStatusesData = (cb) => {
    fetchData(cb, apiUrls.API_STATUSES)
}
