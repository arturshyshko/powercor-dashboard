import { connect } from 'react-redux'

import { getProjects } from '../actions/projects'
import { getClients } from '../actions/clients'
import { getManagers } from '../actions/managers'
import { getDisciplineNames } from '../actions/disciplines'

import { ProjectEdit } from '../components/ProjectEdit'

const mapStateToProps = state => {
    return {
        projects: state.projects,
        managers: state.managers,
        clients: state.clients,
        disciplineNames: state.disciplines
    }
}

const mapDispatchToProps = dispatch => ({

})

const ProjectsEditContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectEdit)

export default ProjectsEditContainer
