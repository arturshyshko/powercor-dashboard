import axios from './httpClient'
import * as apiUrls from '../constants/apiUrls'
import { camelizeKeys, decamelizeKeys } from './attributesProcessors'
import { observable } from 'mobx'


export const fetchData = (cb, url) => {
    axios({
        method: 'GET',
        url: url,

    }).then(response => {
        cb(camelizeKeys(response.data))
        tracker.inc()

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

class Tracker {
    @observable count = 0

    inc() {
        this.count += 1
    }

    getCount() {
        return this.count
    }
}

export const tracker = new Tracker()