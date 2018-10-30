import { types, getRoot } from 'mobx-state-tree'

import createAllActions from '@store/helpers'
import asyncReference from '@store/helpers/asyncIdentifier'

import { API_PROJECTS } from '@constants/apiUrls'

import { Manager } from '@store/manager'
import { Client } from '@store/client'
import { BusinessImportanceChoice } from '@store/choice'


export const Project = types.model('Project', {
    network: types.identifierNumber,
    name: types.string,
    manager: asyncReference(Manager),
    client: asyncReference(Client),
    comment: types.optional(types.string, ''),
    businessImportance: asyncReference(BusinessImportanceChoice, 'getOrLoadChoice'),
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
    createAllActions('projects', API_PROJECTS, 'network')
)

export default ProjectStore
