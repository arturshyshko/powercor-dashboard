import React, { Fragment } from 'react'
import siteTemplate from '@components/template'
import { ProjectsListTable } from '@components/tables'

import ProjectEdit from '@components/forms/ProjectEdit'

const ProjectsList = (props) => (
    <Fragment>
        <ProjectsListTable />
    </Fragment>
)

export default siteTemplate(ProjectsList)
