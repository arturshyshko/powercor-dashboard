import axios from './httpClient'
import * as apiUrls from '../constants/apiUrls'
import { camelizeKeys, decamelizeKeys } from './attributesProcessors'


export const fetchData = (cb, url) => {
    axios({
        method: 'GET',
        url: url,

    }).then(response => {
        cb(camelizeKeys(response.data))

    }).catch(error => {
        console.log(error)
    })
}

export const updateObject = (data, cb, url, id) => {
    axios.patch(
        url + id + '/',
        decamelizeKeys(data)
    ).then(response => {
        cb(camelizeKeys(response.data))
    }).catch(error => {
        console.log(error)
    })
}
