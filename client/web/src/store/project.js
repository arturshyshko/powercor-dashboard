import { types, getRoot } from 'mobx-state-tree'

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
}).views(self => ({

    get disciplines() {
        return getRoot(self).disciplineStore.getProjectDisciplines(self).reduce((result, disc) => {
            result[disc.name] = disc
            return result
        }, {})
    },

}))


const ProjectStore = types.model('ProjectStore', {
    projects: types.array(Project)
}).views(self => ({

})).actions(self => ({
    parseProject(obj) {
        return Project.create({
            network: obj.network,
            name: obj.name,
            manager: obj.manager,
            client: obj.client,
            comment: obj.comment,
            businessImportance: obj.businessImportance,
            priority: obj.priority,
            status: obj.status,
        })

    },

    addProject(object) {
        self.projects.push(self.parseProject(object))
    },

    addProjects(data) {
        data.map(project => {
            self.addProject(project)
        })
    },

    setProject(project) {
        // Replace old instance if the id's are the same
        // Add new one if there are no projects with this id
        let oldProject = self.projects.find(obj => obj.network === project.network)
        if (oldProject) {
            self.oldProject = self.parseProject(project)
        } else{
            self.addProject(project)
        }
    },

    setProjects(data) {
        data.map(project => {
            self.setProject(project)
        })
    },

}))

export default ProjectStore
