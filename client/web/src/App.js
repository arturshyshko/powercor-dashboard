import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';

import { DASHBOARD } from './constants/clientUrls'
import Dashboard from './containers/Dashboard'


const App = () => (
    <Switch>
        <Route exact path={DASHBOARD} component={Dashboard} />
    </Switch>
)

export default App
