import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-table/react-table.css'
import './index.css'
import App from './App'

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from '@store'
import {tracker} from '@services/apiAccess'


ReactDOM.render(
    <Provider store={store} tracker={tracker} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
