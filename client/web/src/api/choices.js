import store from '@store'

import { API_IMPORTANCES, API_RESOURCES, API_STAGES, API_STATUSES } from '../constants/apiUrls'
import { fetchData } from '../services/apiAccess'

export const fetchImportancesData = (cb) => {
    fetchData(cb, API_IMPORTANCES)
}

export const fetchResourcesData = (cb) => {
    fetchData(cb, API_RESOURCES)
}

export const fetchStagesData = (cb) => {
    fetchData(cb, API_STAGES)
}

export const fetchStatusesData = (cb) => {
    fetchData(cb, API_STATUSES)
}

export const setImportanceChoices = () => {
    fetchImportancesData(store.businessImportanceChoiceStore.setChoices)
}

export const setResourcesChoices = () => {
    fetchResourcesData(store.resourceChoiceStore.setChoices)
}

export const setStageChoices = () => {
    fetchStagesData(store.stageChoiceStore.setChoices)
}

export const setStatusChoices = () => {
    fetchStatusesData(store.statusChoiceStore.setChoices)
}

