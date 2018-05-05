import * as apiUrls from '../constants/apiUrls'
import { fetchData, updateObject } from '../services/apiAccess'

export const fetchProjectsData = (cb) => {
    fetchData(cb, apiUrls.API_PROJECTS)
}

export const updateProject = (data, cb, id=null) => {
    let object_id = id ? id : data['id']
    updateObject(data, cb, apiUrls.API_PROJECTS, object_id)
}

