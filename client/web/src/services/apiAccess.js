import axios from './httpClient'
import * as apiUrls from '../constants/apiUrls'


let fetchData = (cb, url) => {
    axios({
        method: 'GET',
        url: url,
    }).then(response => {
        cb(response.data)
    }).catch(error => {
        console.log(error)
    })
}

export const fetchProjectsData = (cb) => {
    fetchData(cb, apiUrls.API_PROJECTS)
}

export const fetchDisciplinesData = (cb) => {
    fetchData(cb, apiUrls.API_DISCIPLINES)
}

export const fetchManagersData = (cb) => {
    fetchData(cb, apiUrls.API_MANAGERS)
}

export const fetchClientsData = (cb) => {
    fetchData(cb, apiUrls.API_CLIENTS)
}

export const fetchImportancesData = (cb) => {
    fetchData(cb, apiUrls.API_IMPORTANCES)
}

export const fetchResourcesData = (cb) => {
    fetchData(cb, apiUrls.API_RESOURCES)
}

export const fetchPStagesData = (cb) => {
    fetchData(cb, apiUrls.API_STAGES)
}

export const fetchStatusesData = (cb) => {
    fetchData(cb, apiUrls.API_STATUSES)
}


