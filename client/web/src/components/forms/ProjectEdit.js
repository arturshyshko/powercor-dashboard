import React from 'react'
import { observer, inject } from 'mobx-react'

// import { DisciplineForm } from './DisciplineForm'
import ProjectForm from './ProjectForm'


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
        const { store } = this.props

        return(
            <div>
                <form method="post" action="/">
                    <ProjectForm
                        project={store.projectStore.projects[0]}
                        managers={store.managerStore.selectMap}
                        clients={store.clientStore.selectMap}
                        importances={store.businessImportanceChoiceStore.selectMap}
                        handleInputChange={this.handleProjectChange}
                    />
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button
                                type="submit"
                                className="btn btn-default"
                                onClick={this.handleSubmit}
                            >
                            Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProjectEdit
