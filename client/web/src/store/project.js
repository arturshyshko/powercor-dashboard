import { types } from 'mobx-state-tree'

import { Manager } from '@store/manager'
import { Client } from '@store/client'
import {
    BusinessImportanceChoice, StatusChoice, StageChoice, ResourcesChoice
} from '@store/choice'


export const Project = types.model('Project', {
    network: types.identifier,
    name: types.string,
    manager: types.reference(Manager),
    client: types.reference(Client),
    comment: types.optional(types.string, ''),
    businessImportance: types.reference(BusinessImportanceChoice),
    priority: types.number,
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
