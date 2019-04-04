import { types } from 'mobx-state-tree'

import createAllActions from '@store/helpers'

import { API_PROJECTS } from '@constants/apiUrls'

import { Discipline } from '@store/discipline'
import { Manager } from '@store/manager'
import { Client } from '@store/client'
import { BusinessImportanceChoice } from '@store/choice'


export const Project = types.model('Project', {
    network: types.identifierNumber,
    name: types.string,
    manager: types.reference(Manager),
    client: types.reference(Client),
    comment: types.optional(types.string, ''),
    businessImportance: types.reference(BusinessImportanceChoice),
    priority: types.maybeNull(types.number),
    status: types.string,
    disciplines: types.array(Discipline),
})


const ProjectStore = types.compose(
    types.model('ProjectStore', {
        projects: types.array(Project)
    }),
    createAllActions('projects', API_PROJECTS, 'network')
)

export default ProjectStore
