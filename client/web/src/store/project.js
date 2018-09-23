import { types, getRoot } from 'mobx-state-tree'
import createBaseActions from '@store/helpers'

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

})).preProcessSnapshot(snapshot => ({
    network: snapshot.network,
    name: snapshot.name,
    manager: snapshot.manager,
    client: snapshot.client,
    comment: snapshot.comment,
    businessImportance: snapshot.businessImportance,
    priority: snapshot.priority,
    status: snapshot.status,
}))


const ProjectStore = types.compose(
    types.model('ProjectStore', {
        projects: types.array(Project)
    }),
    createBaseActions('projects', 'network')
)

export default ProjectStore
