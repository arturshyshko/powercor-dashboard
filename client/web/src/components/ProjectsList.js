import React from 'react'
import '../App.css'
import ProjectEditContainer from '../containers/ProjectEdit'



export class ProjectsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showEditProject: false,
            editableProject: null
        }

        this.editProject = this.editProject.bind(this)
    }

    editProject(event) {
        let projectId = event.currentTarget.getAttribute('project')
        let project = this.props.projects.find((proj) => (proj['network'] == projectId))

        this.setState({
            showEditProject: !this.state.showEditProject,
            editableProject: project
        })
    }

    render() {
        return (
            <div>
                <table className="table table-bordered table-hover" style={{textAlign: 'center', marginTop: '20px'}}>
                    <thead style={{textAlign: 'center'}}>
                        <tr>
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Name</th>
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Manager</th>
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Comments</th>
                            <th colSpan="10" style={{verticalAlign: 'middle'}}>Upcoming milestones</th>
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Priority</th>
                        </tr>
                        <tr>
                            {
                                this.props.disciplineNames.map((discipline, i) => (
                                    <td key={i} colSpan="2">{discipline[1]}</td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.projects.map((project, i) => (
                                <tr key={i} onClick={this.editProject} project={project.network} >
                                    <td>{project.network + ' ' + project.name}</td>
                                    <td>{this.props.managers.find(man => man.id === project.manager).name}</td>
                                    <td>{project.comment}</td>
                                    {
                                        this.props.disciplineNames.map((discipline, i) => {
                                            let a = project.disciplines.find((disc) => (disc['name'] === discipline[0]))
                                            return [
                                                <td key={i}>{a ? a['stage'] : ''}</td>,
                                                <td key={i + 5}>{a ? a['due_date'] : ''}</td>
                                            ]
                                        })
                                    }
                                    <td>{project.priority}</td>
                                </tr>
                                ))
                        }
                    </tbody>
                </table>
                {
                    this.state.showEditProject &&
                    <ProjectEditContainer
                        project={this.state.editableProject}
                    />
                }
            </div>
            )
    }
}
