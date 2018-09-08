import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';

import { DASHBOARD } from '@constants/clientUrls'

import { setProjects } from '@api/projects'
import { setDisciplines } from '@api/disciplines'
import { setVariations } from '@api/approvedVariations'
import { setManagers } from '@api/managers'
import { setClients } from '@api/clients'
import { setImportanceChoices, setResourcesChoices, setStageChoices, setStatusChoices } from '@api/choices'


class App extends React.Component {
    componentDidMount() {
        setManagers()
        setProjects()
        setClients()
        setDisciplines()
        setImportanceChoices()
        setResourcesChoices()
        setStatusChoices()
        setStageChoices()
        setVariations()
    }

    render() {
        return (
            <div>Base MobX setup testing</div>
        )
    }
}

export default App
