import { connect } from 'react-redux'
import { fetchProjects } from '../actions/projects'
import { Dashboard } from '../components/Dashboard'

const mapStateToProps = state => {
    return {
        projects: state.projects,
    }
}

const mapDispatchToProps = dispatch => ({
        fetchProjects: (data) => dispatch(fetchProjects(data))
    })

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer
