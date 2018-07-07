import { connect } from 'react-redux'

import { getProjects } from '../actions/projects'
import { getClients } from '../actions/clients'
import { getManagers } from '../actions/managers'
import { getDisciplineNames } from '../actions/disciplines'
import { getImportances } from '../actions/importances'

import { ProjectsList } from '../components/ProjectsList'

const mapStateToProps = state => {
    return {
        projects: state.projects,
        managers: state.managers,
        clients: state.clients,
        disciplineNames: state.disciplines
    }
}

const mapDispatchToProps = dispatch => ({
        getProjects: (data) => dispatch(getProjects(data)),
        getManagers: (data) => dispatch(getManagers(data)),
        getClients: (data) => dispatch(getClients(data)),
        getDisciplineNames: (data) => dispatch(getDisciplineNames(data)),
        getImportances: (data) => dispatch(getImportances(data)),
    })

const ProjectsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsList)

export default ProjectsListContainer
