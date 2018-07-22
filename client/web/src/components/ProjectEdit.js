import React from 'react'
import '../App.css'

import { DisciplineForm } from './DisciplineForm'
import { ProjectForm } from './ProjectForm'

import { FormControl, InputText, InputTextArea, InputSelect } from './helpers/FormElements'
import { camelizeKeys, filterKeys } from '../services/attributesProcessor'


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
            },
        }

        this.handleProjectChange = this.handleProjectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
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
