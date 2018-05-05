import { connect } from 'react-redux'
import { getProjects } from '../actions/projects'
import { getClients } from '../actions/clients'
import { getManagers } from '../actions/managers'
import { ProjectsList } from '../components/ProjectsList'

const mapStateToProps = state => {
    return {
        projects: state.projects,
        managers: state.managers,
        clients: state.clients
    }
}

const mapDispatchToProps = dispatch => ({
        getProjects: (data) => dispatch(getProjects(data)),
        getManagers: (data) => dispatch(getManagers(data)),
        getClients: (data) => dispatch(getClients(data))
    })

const ProjectsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsList)

export default ProjectsListContainer
