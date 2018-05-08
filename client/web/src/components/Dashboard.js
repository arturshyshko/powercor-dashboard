import React from 'react'
import '../App.css'
import ProjectsListContainer from '../containers/ProjectsList'
import ProjectEditContainer from '../containers/ProjectEdit'

export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showCreate: false,
        }

        this.createProject = this.createProject.bind(this)
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