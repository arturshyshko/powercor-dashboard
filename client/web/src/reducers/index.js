import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer'
import clientsReducer from './clientsReducer'
import managersReducer from './managersReducer'
import disciplinesReducer from './disciplinesReducer'

export default combineReducers({
    projects: projectsReducer,
    managers: managersReducer,
    clients: clientsReducer,
    disciplines: disciplinesReducer
});
