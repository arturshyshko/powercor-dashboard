import React, { Fragment } from 'react'
import siteTemplate from '@components/template'
import { ProjectsListTable } from '@components/tables'

import ProjectEdit from '@components/forms/ProjectEdit'

const ProjectsList = (props) => (
    <Fragment>
        <ProjectsListTable />
        <ProjectEdit />
    </Fragment>
)

export default siteTemplate(ProjectsList)
