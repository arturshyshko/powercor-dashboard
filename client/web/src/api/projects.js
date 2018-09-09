import store from '@store'

import { API_PROJECTS } from '../constants/apiUrls'
import { fetchData, updateObject } from '../services/apiAccess'

export const fetchProjectsData = (cb) => {
    fetchData(cb, API_PROJECTS)
}

export const setProjects = () => {
    fetchProjectsData(store.projectStore.setProjects)
}

export const updateProject = (data, cb, id=null) => {
    let object_id = id ? id : data['network'] ? data['network'] : data['id']
    updateObject(data, cb, API_PROJECTS, object_id)
}

