import React from 'react'
import { observer, inject } from 'mobx-react'

import { DisciplineForm } from './DisciplineForm'
import { ProjectForm } from './ProjectForm'

import { FormControl, InputText, InputTextArea, InputSelect } from '@components/helpers/FormElements'
import { camelizeKeys, filterKeys } from '@services/attributesProcessors'


@inject('store')
@observer
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

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        // if project passed - replace empty state with values from it
        if (this.props.project) {
            // Leave only values present in state.project
            this.setState({
                project: {...filterKeys(this.props.project, Object.keys(this.state.project))}
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
        let store = this.props.store

        return(
            <div>
                <form >
                    <ProjectForm
                        project={this.state.project}
                        managers={store.managerStore.managers}
                        clients={store.clientStore.clients}
                        importances={store.businessImportanceChoiceStore.choices}
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
