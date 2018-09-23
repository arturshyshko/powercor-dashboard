import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';

import { DASHBOARD } from '@constants/clientUrls'

import { setProjects } from '@api/projects'
import { setDisciplines, setDisciplineNames } from '@api/disciplines'
import { setVariations } from '@api/approvedVariations'
import { setManagers } from '@api/managers'
import { setClients } from '@api/clients'
import { setImportanceChoices, setResourcesChoices, setStageChoices, setStatusChoices } from '@api/choices'

import { Dashboard } from '@components/Dashboard'

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
            <Switch>
                <Route exact path={DASHBOARD} component={Dashboard} />
            </Switch>
        )
    }
}

export default App
