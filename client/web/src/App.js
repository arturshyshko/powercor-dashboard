import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';

import { fetchData } from '@services/apiAccess'
import { configureStore } from '@store'
import store from '@store'

import { DASHBOARD } from '@constants/clientUrls'
import { TestView } from '@components/testMobX'
import { Provider } from 'mobx-react'

import {fetchManagersData} from '@api/managers'
import {fetchProjectsData} from '@api/projects'
import {fetchClientsData} from '@api/clients'
import {fetchDisciplinesData} from '@api/disciplines'
import {fetchImportancesData, fetchResourcesData, fetchStagesData, fetchStatusesData} from '@api/choices'
import {fetchVariationsData} from '@api/approvedVariations'
import {setManagers} from '@actions/manager'
import {setProjects} from '@actions/project'
import {setDisciplines} from '@actions/discipline'
import {setClients} from '@actions/client'
import {setImportanceChoices, setResourcesChoices, setStageChoices, setStatusChoices} from '@actions/choice'
import {setVariations} from '@actions/approvedVariation'


class App extends React.Component {
    componentDidMount() {
        fetchManagersData(setManagers)
        fetchProjectsData(setProjects)
        fetchClientsData(setClients)
        fetchDisciplinesData(setDisciplines)
        fetchImportancesData(setImportanceChoices)
        fetchResourcesData(setResourcesChoices)
        fetchStatusesData(setStatusChoices)
        fetchStagesData(setStageChoices)
        fetchVariationsData(setVariations)
    }

    render() {
        return (
            <Provider store={store} >
                <div>testing MobX in progress</div>
            </Provider>
        )
    }
}

export default App
