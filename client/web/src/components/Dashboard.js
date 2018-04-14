import React from 'react'
import '../App.css'
import { fetchProjectsData } from '../services/apiAccess'
import { ProjectEdit } from './ProjectEdit'
import { ProjectsList } from './ProjectsList'

export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isCreate: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.createProject = this.createProject.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        fetchProjectsData()
    }

    createProject() {
        this.setState({
            isCreate: true
        })
    }

    render() {
        return(
            <div className="container">
                {this.state.isCreate && <ProjectEdit /> }
                <button className="btn btn-default" onClick={this.createProject}>Submit</button>
                <ProjectsList />
            </div>
        )
    }
}