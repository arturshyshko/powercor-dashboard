import React from 'react'
import '../App.css'
import ProjectsListContainer from '../containers/ProjectsList'
import ProjectEditContainer from '../containers/ProjectEdit'

import { fetchProjectsData, updateProject } from '../api/projects'
import { fetchManagersData } from '../api/managers'
import { fetchClientsData } from '../api/clients'
import { fetchDisciplineNames } from '../api/disciplines'
import { fetchImportancesData } from '../api/importances'

export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showCreate: false,
        }

        this.createProject = this.createProject.bind(this)
        this.updateProject = this.updateProject.bind(this)
        this.cb = this.cb.bind(this)
    }

    componentWillMount() {
        fetchClientsData(this.props.getClients)
        fetchManagersData(this.props.getManagers)
        fetchProjectsData(this.props.getProjects)
        fetchDisciplineNames(this.props.getDisciplineNames)
        fetchImportancesData(this.props.getImportances)
    }

    createProject() {
        this.setState({
            showCreate: true
        })
    }

    cb(a) {
        console.log(a)
    }

    updateProject() {
        let data = {
            'network': 1111111,
            'disciplines': [
                {
                    'name': 'CD',
                    'project': 1111111,
                    'budget': 50000.00
                },
                {
                    'name': 'PD',
                    'project': 1111111,
                    'budget': 100
                }
            ]
        }

        updateProject(data, this.cb)
    }

    render() {
        console.log(this.props.projects)
        return(
            <div className="container">
                {this.state.showCreate &&
                    <ProjectEditContainer />
                }
                <button className="btn btn-default" onClick={this.createProject}>Create new project</button>
                <ProjectsListContainer />
            </div>
        )
    }
}