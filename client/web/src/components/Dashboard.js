import React from 'react'
import '../App.css'
import ProjectsListContainer from '../containers/ProjectsList'
import ProjectEditContainer from '../containers/ProjectEdit'

import { fetchProjectsData } from '../api/projects'
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

    render() {
        return(
            <div className="container">
                {this.state.showCreate && <ProjectEditContainer /> }
                <button className="btn btn-default" onClick={this.createProject}>Submit</button>
                <ProjectsListContainer />
            </div>
        )
    }
}