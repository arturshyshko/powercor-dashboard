import React from 'react'
import '../App.css'
import { ProjectEdit } from './ProjectEdit'
import { ProjectsList } from './ProjectsList'
import { fetchProjectsData } from '../services/apiAccess'

export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showCreate: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.createProject = this.createProject.bind(this)
    }

    handleSubmit(e) {
        fetchProjectsData(this.props.fetchProjects)
    }

    createProject() {
        this.setState({
            showCreate: true
        })
    }

    render() {
        return(
            <div className="container">
                {this.state.showCreate && <ProjectEdit /> }
                <button className="btn btn-default" onClick={this.createProject}>Submit</button>
                <button className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}