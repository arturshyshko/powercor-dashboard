import { connect } from 'react-redux'
import { fetchProjects } from '../actions/projects'
import { fetchProjectsData } from '../services/apiAccess'
import { Dashboard } from '../components/Dashboard'

const mapStateToProps = state => {
    return {
        projects: state.projects,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => {
            dispatch(fetchProjectsData(fetchProjects()))
        }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer
