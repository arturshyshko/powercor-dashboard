import React from 'react'
import '../App.css'
import { fetchProjectsData } from '../api/projects'
import { fetchManagersData } from '../api/managers'
import { fetchClientsData } from '../api/clients'

export class ProjectsList extends React.Component {

    componentWillMount() {
        fetchClientsData(this.props.getClients)
        fetchManagersData(this.props.getManagers)
        fetchProjectsData(this.props.getProjects)
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
                        this.props.projects.map((project, i) => (
                            <tr key={i}>
                                <th>{project.network + ' ' + project.name}</th>
                                <th>{this.props.managers.find(man => man.id === project.manager).name}</th>
                                <th>{this.props.clients.find(client => client.id === project.client).name}</th>
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
