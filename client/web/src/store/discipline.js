import { types, getRoot } from 'mobx-state-tree'
import createBaseActions from '@store/helpers'

import { Project } from '@store/project'
import { Client } from '@store/client'
import {
    BusinessImportanceChoice, StatusChoice, StageChoice, ResourceChoice
} from '@store/choice'


export const Discipline = types.model('Discipline', {
    id: types.identifierNumber,
    name: types.string,
    project: types.maybeNull(types.reference(Project)),
    stage: types.maybeNull(types.reference(StageChoice)),
    budget: types.optional(types.number, 0.00),
    dueDate: types.maybeNull(types.Date),
    resources: types.maybeNull(types.reference(ResourceChoice)),
    status: types.maybeNull(types.reference(StatusChoice)),
    actualCost: types.maybeNull(types.number),
}).views(self => ({
    get verboseName() {
        return getRoot(self).disciplineStore.names.find(name => name.id === self.name).name
    }
})).preProcessSnapshot(snapshot => ({
    id: snapshot.id,
    name: snapshot.name,
    project: snapshot.project,
    stage: snapshot.stage,
    budget: snapshot.budget,
    dueDate: new Date(snapshot.dueDate),
    resources: snapshot.resources,
    status: snapshot.status,
    actualCost: snapshot.actualCost,
}))


export const DisciplineName = types.model('DisciplineName', {
    id: types.identifier,
    name: types.string,
}).preProcessSnapshot(snapshot => ({
    id: snapshot[0],
    name: snapshot[1],
}))


const DisciplineStore = types.compose(
    types.model('DisciplineStore', {
        disciplines: types.array(Discipline),
        names: types.array(DisciplineName),
    }).views(self => ({

        getProjectDisciplines(project) {
            return self.disciplines.filter(disc => disc.project.network === project.network)
        },

        get verboseNames() {
            return self.names.map(disciplineName => disciplineName.name)
        }

    })),
    createBaseActions('disciplines'),
    createBaseActions('names')
)

export default DisciplineStore
