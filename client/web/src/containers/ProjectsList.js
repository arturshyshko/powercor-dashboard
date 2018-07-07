import { connect } from 'react-redux'

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

})

const ProjectsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsList)

export default ProjectsListContainer
