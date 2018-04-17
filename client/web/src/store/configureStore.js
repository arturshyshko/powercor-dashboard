import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers'

const configureStore = (initialState) => (createStore(rootReducer, initialState))

export default configureStore
