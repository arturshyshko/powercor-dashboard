import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import store from '@store'

import {tracker} from '@services/apiAccess'


ReactDOM.render(
    <Provider store={store} tracker={tracker} >
        <App />
    </Provider>,
    document.getElementById('root')
);
