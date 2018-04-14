import React from 'react'
import '../App.css'
import { fetchProjectsData, fetchManagersData, fetchClientsData } from '../services/apiAccess'

export class ProjectsList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            managers: [],
            clients: [],
        }

        this.setClientsData = this.setClientsData.bind(this)
        this.setManagersData = this.setManagersData.bind(this)
        this.setProjectsData = this.setProjectsData.bind(this)
    }

    setProjectsData(data) {
        this.setState({
            projects: data
        })
    }

    setManagersData(data) {
        this.setState({
            managers: data
        })
    }
    setClientsData(data) {
        this.setState({
            clients: data
        })
    }

    componentWillMount() {
        fetchClientsData(this.setClientsData)
        fetchManagersData(this.setManagersData)
        fetchProjectsData(this.setProjectsData)
    }

    render() {
        console.log(this.state.projects)
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Network</th>
                        <th>Name</th>
                        <th>Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.projects.map((project) => (
                            <tr>
                                <th>{project.network}</th>
                                <th>{project.name}</th>
                                <th>{project.manager}</th>
                            </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            )
    }
}
