import { types } from 'mobx-state-tree'

import { Manager } from '@store/manager'
import { Client } from '@store/client'
import {BusinessImportanceChoice } from '@store/choice'


export const Project = types.model('Project', {
    network: types.identifierNumber,
    name: types.string,
    manager: types.maybeNull(types.reference(Manager)),
    client: types.maybeNull(types.reference(Client)),
    comment: types.optional(types.string, ''),
    businessImportance: types.maybeNull(types.reference(BusinessImportanceChoice)),
    priority: types.maybeNull(types.number),
    status: types.string,
})


const ProjectStore = types.model('ProjectStore', {
    projects: types.array(Project)
}).views(self => ({

})).actions(self => {

    function addProject(project) {
        self.projects.push(project)
    }

    return { addProject, }
})

export default ProjectStore
