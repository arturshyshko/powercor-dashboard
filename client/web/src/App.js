import React from 'react'
import './App.css';

import { Switch, Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import history from '@services/history'

import { PROJECTS_LIST, FINANCIAL_REPORT, RESOURCE_ALLOCATION } from '@constants/clientUrls'
import { ProjectsList, FinancialReport, ResourceAllocation } from '@pages'

import { setProjects } from '@api/projects'
import { setDisciplines, setDisciplineNames } from '@api/disciplines'
import { setVariations } from '@api/approvedVariations'
import { setManagers } from '@api/managers'
import { setClients } from '@api/clients'
import { setImportanceChoices, setResourcesChoices, setStageChoices, setStatusChoices } from '@api/choices'

import { inject, observer } from 'mobx-react'


@inject('tracker')
@observer
class App extends React.Component {
    componentDidMount() {
        setManagers()
        setProjects()
        setClients()
        setDisciplines()
        setDisciplineNames()
        setImportanceChoices()
        setResourcesChoices()
        setStatusChoices()
        setStageChoices()
        setVariations()
    }

    render() {
        if (this.props.tracker.getCount() < 10) return null
        return (
            <Router history={history} >
                <Switch>
                    <Route exact path={PROJECTS_LIST} component={ProjectsList} />
                    <Route exact path={FINANCIAL_REPORT} component={FinancialReport} />
                    <Route exact path={RESOURCE_ALLOCATION} component={ResourceAllocation} />
                </Switch>
            </Router>
        )
    }
}

export default App
