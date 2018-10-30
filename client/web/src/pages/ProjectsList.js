import React from 'react'
import { ProjectsListTable } from '@components/tables'
import siteTemplate from '@components/template'


const ProjectsList = (props) => (
    <ProjectsListTable />
)

export default siteTemplate(ProjectsList)
