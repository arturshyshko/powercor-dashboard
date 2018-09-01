import React from 'react'
import '../App.css'

import { DisciplineForm } from './DisciplineForm'
import { ProjectForm } from './ProjectForm'

import { FormControl, InputText, InputTextArea, InputSelect } from './helpers/FormElements'
import { camelizeKeys, filterKeys } from '../services/attributesProcessors'


export class ProjectEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            project: {
                network: '',
                name: '',
                manager: '',
                client: '',
                comment: '',
                businessImportance: '',
                disciplines: [],
            },
        }

        this.handleProjectChange = this.handleProjectChange.bind(this)
        this.handleDisciplineChange = this.handleDisciplineChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        console.log(this.props.project)
        // if project passed - replace empty state with values from it
        if (this.props.project) {
            // Camelize all project attributes
            let project = camelizeKeys(this.props.project)
            // Leave only values present in state.project
            this.setState({
                project: {...filterKeys(project, Object.keys(this.state.project))}
            })
        }
    }

    handleProjectChange(e) {
        const value = e.target.value
        const name = e.target.name || e.target.control

        this.setState({
            project: {...this.state.project, [name]: value}
        })
    }

    handleDisciplineChange(e) {
        // const value = e.target.value
        // const name = e.target.name || e.target.control
        // // if we changed discipline name - get needed one by name and remove it from list
        // //
        // if (name === 'name' ) {
        //     let disciplines = this.state.project.disciplines.filter(disc => disc['name'] != value)

        // }

        // if (discipline) {
        //     this.setState({
        //         pro
        //     })
        // }
        console.log(1)
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        console.log(this.state.project)
        return(
            <div>
                <form >
                    <ProjectForm
                        project={this.state.project}
                        managers={this.props.managers}
                        clients={this.props.clients}
                        importances={this.props.importances}
                        handleInputChange={this.handleProjectChange}
                    />
                    {
                        this.state.project.disciplines.map((discipline, i) => {
                            <DisciplineForm
                                discipline={discipline}
                                handleInputChange={this.handleDisciplineChange}
                                disciplineNames={this.props.disciplineNames}
                            />
                        })
                    }
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
