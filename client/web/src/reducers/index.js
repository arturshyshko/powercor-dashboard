import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer'
import clientsReducer from './clientsReducer'
import managersReducer from './managersReducer'
import importancesReducer from './importancesReducer'
import disciplinesReducer from './disciplinesReducer'

export default combineReducers({
    projects: projectsReducer,
    managers: managersReducer,
    importances: importancesReducer,
    clients: clientsReducer,
    disciplines: disciplinesReducer,
})
