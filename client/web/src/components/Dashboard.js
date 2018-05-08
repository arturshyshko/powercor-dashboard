import React from 'react'
import '../App.css'
import { ProjectEdit } from './ProjectEdit'
import ProjectsListContainer from '../containers/ProjectsList'
import ProjectEditContainer from '../containers/ProjectEdit'
import { fetchProjectsData, updateProject } from '../api/projects'

export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showCreate: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.createProject = this.createProject.bind(this)
        this.handleTest = this.handleTest.bind(this)
    }

    handleSubmit(e) {
        fetchProjectsData(this.props.getProjects)
    }

    handleTest(e) {
        let data = {
            'id' : 1111111,
            'comment': 'wow this actually works8'
        }
        updateProject(data, this.props.updateProject)

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
                <button className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                <button className="btn btn-default" onClick={this.handleTest}>test</button>
                <ProjectsListContainer />
            </div>
        )
    }
}