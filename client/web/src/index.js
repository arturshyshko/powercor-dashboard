import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store';


import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(

    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
