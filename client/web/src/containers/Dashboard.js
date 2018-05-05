import { connect } from 'react-redux'
import { getProjects, updateProject } from '../actions/projects'
import { Dashboard } from '../components/Dashboard'

const mapStateToProps = state => {
    return {
        projects: state.projects,
    }
}

const mapDispatchToProps = dispatch => ({
        getProjects: (data) => dispatch(getProjects(data)),
        updateProject: (data) => dispatch(updateProject(data))
    })

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer
