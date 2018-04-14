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
        return (
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Manager</th>
                        <th>Client</th>
                        <th>Comments</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.projects.map((project, i) => (
                            <tr key={i}>
                                <th>{project.network + ' ' + project.name}</th>
                                <th>{this.state.managers.find(man => man.id === project.manager).name}</th>
                                <th>{this.state.clients.find(client => client.id === project.client).name}</th>
                                <th>{project.comment}</th>
                                <th>{project.priority}</th>
                            </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            )
    }
}
