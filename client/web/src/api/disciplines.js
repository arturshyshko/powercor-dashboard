import store from '@store'

import { API_DISCIPLINES, API_DISCIPLINE_NAMES } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchDisciplinesData = (cb) => {
    fetchData(cb, API_DISCIPLINES)
}

export const setDisciplines = () => {
    fetchDisciplinesData(store.disciplineStore.setDisciplines)
}


export const fetchDisciplineNames = (cb) => {
    fetchData(cb, API_DISCIPLINE_NAMES)
}

export const setDisciplineNames = () => {
    fetchDisciplineNames(store.disciplineStore.setNames)
}