import { connect } from 'react-redux'
import { getProjects, updateProject } from '../actions/projects'
import { Dashboard } from '../components/Dashboard'
import { getClients } from '../actions/clients'
import { getManagers } from '../actions/managers'
import { getDisciplineNames } from '../actions/disciplines'
import { getImportances } from '../actions/importances'

const mapStateToProps = state => ({

})


const mapDispatchToProps = dispatch => ({
        getProjects: (data) => dispatch(getProjects(data)),
        updateProject: (data) => dispatch(updateProject(data)),
        getManagers: (data) => dispatch(getManagers(data)),
        getClients: (data) => dispatch(getClients(data)),
        getDisciplineNames: (data) => dispatch(getDisciplineNames(data)),
        getImportances: (data) => dispatch(getImportances(data)),
    })

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)

export default DashboardContainer
