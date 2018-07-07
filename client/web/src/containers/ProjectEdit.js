import { connect } from 'react-redux'

import { ProjectEdit } from '../components/ProjectEdit'

const mapStateToProps = state => {
    console.log(state)
    return {
        managers: state.managers,
        clients: state.clients,
        disciplineNames: state.disciplines,
        importances: state.importances,
    }
}

const mapDispatchToProps = dispatch => ({

})

const ProjectsEditContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectEdit)

export default ProjectsEditContainer
