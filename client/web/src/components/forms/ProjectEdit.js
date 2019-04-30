import React from 'react'
import moment from "moment";
import { observer, inject } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'

import DisciplineForm from './DisciplineForm'
import ProjectForm from './ProjectForm'

import { updateProject } from '@api/projects'


@inject('store')
@observer
class ProjectEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            project: {
                network: '',
                name: '',
                priority: '',
                status: '',
                manager: '',
                client: '',
                comment: '',
                businessImportance: '',
                disciplines: [],
            },
        }

        this.handleProjectChange = this.handleProjectChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDisciplineChange = this.handleDisciplineChange.bind(this)
        this.handleDisciplineDelete = this.handleDisciplineDelete.bind(this)
        this.handleApprovedVariationChange = this.handleApprovedVariationChange.bind(this)
    }

    componentDidMount() {
        const { project } = this.props
        if (project) {
            this.setState({
                project: getSnapshot(project),
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

    handleDisciplineChange(event, disciplineID) {
        const value = event.target.value
        const name = event.target.name || event.target.control

        // Just change value of the 'name' field in the required discipline, otherwise - return same object.
        const disciplines = this.state.project.disciplines.map(d => d.id === disciplineID ? ({...d, [name]: value}) : d)

        this.setState({
            project: {...this.state.project, disciplines: disciplines}
        })
    }

    handleDisciplineDelete(disciplineID) {
        const { project } = this.state
        // Delete discipline from project disciplines array by it's id.
        const disciplines = project.disciplines.filter(discipline => discipline.id !== disciplineID)

        this.setState({
            project: {...this.state.project, disciplines: disciplines}
        })
    }

    handleApprovedVariationChange(event, variationID) {
        const value = event.target.value
        const name = event.target.name || event.target.control

        // We iterate through disciplines, find one with required variation and change that variation.
        const disciplines = this.state.project.disciplines.map(d =>
            ({...d, approvedVariations: d.approvedVariations.map(variation =>
                variation.id === variationID ? ({...variation, [name]: value}) : variation)}))

        this.setState({
            project: {...this.state.project, disciplines: disciplines}
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { project } = this.state

        // DRF accepts only iso date format for now
        // TODO: Figure out how to properly accept microseconds (as date stored in MST now).
        const disciplines = project.disciplines.map(
            d => ({...d, dueDate: moment(d.dueDate).format('YYYY-MM-DD'),
                approvedVariations: d.approvedVariations.map(variation =>
                    ({...variation, dueDate: moment(variation.dueDate).format('YYYY-MM-DD')}))}))

        let projectInfo = {...project, disciplines}
        updateProject(projectInfo, (resp) => {
            this.props.store.projectStore.setProject(resp)
        })
    }

    render() {
        const { store } = this.props

        return(
            <div>
                <form method="post" action="/">
                    <ProjectForm
                        project={this.state['project']}
                        managers={store.managerStore.selectMap}
                        clients={store.clientStore.selectMap}
                        importances={store.businessImportanceChoiceStore.selectMap}
                        handleInputChange={this.handleProjectChange}
                    />
                    {this.state.project.disciplines.map((discipline, i) => (
                        <DisciplineForm
                            key={`discipline-form-${i}`}
                            disciplineNames={store.disciplineStore.selectMap}
                            stages={store.stageChoiceStore.selectMap}
                            resources={store.resourceChoiceStore.selectMap}
                            statuses={store.statusChoiceStore.selectMap}
                            discipline={discipline}
                            handleInputChange={this.handleDisciplineChange}
                            handleDelete={this.handleDisciplineDelete}
                            handleVariationChange={this.handleApprovedVariationChange}
                        />
                    ))}
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button
                                type="submit"
                                className="btn btn-default"
                                onClick={this.handleSubmit}
                            >
                            Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProjectEdit
