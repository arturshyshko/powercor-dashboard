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
        console.log(this.props.managers)
        console.log(this.props.projects)
        return (
            <div>
                <table className="table table-bordered table-hover table-striped"
                       style={{textAlign: 'center', marginTop: '20px'}}>
                    <thead style={{textAlign: 'center'}}>
                        <tr>
                            <th rowSpan="2" style={{verticalAlign: 'middle', whiteSpace: 'nowrap'}}>Name</th>
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Manager</th>
                            {
                                this.props.disciplineNames.map((discipline, i) => (
                                    <th key={i} colSpan="2" style={{verticalAlign: 'middle'}}>{discipline[1]}</th>
                                ))
                            }
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Priority</th>
                            <th rowSpan="2" style={{verticalAlign: 'middle'}}>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.projects.map((project, i) => (
                                <tr key={i} onClick={this.editProject} project={project.network} >
                                    <td style={{verticalAlign: 'middle', whiteSpace: 'nowrap'}}>{project.network + ' ' + project.name}</td>
                                    <td>{this.props.managers.find(man => man.id === project.manager.id).name}</td>
                                    {
                                        this.props.disciplineNames.map((discipline, i) => {
                                            let a = project.disciplines.find((disc) => (disc['name'] === discipline[0]))
                                            return [
                                                <td key={i}>{a ? a['stage'] : ''}</td>,
                                                <td key={i + 5}>{a ? a['dueDate'] : ''}</td>
                                            ]
                                        })
                                    }
                                    <td>{project.priority}</td>
                                    <td>{project.comment}</td>
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
