import { types, getRoot } from 'mobx-state-tree'

import createAllActions, {createBaseActions} from '@store/helpers'

import { API_DISCIPLINES } from '@constants/apiUrls'

import { StatusChoice, StageChoice, ResourceChoice } from '@store/choice'
import { ApprovedVariation } from "@store/approvedVariation";


export const Discipline = types.model('Discipline', {
    id: types.identifierNumber,
    name: types.string,
    stage: types.reference(StageChoice),
    budget: types.optional(types.number, 0.00),
    dueDate: types.maybeNull(types.Date),
    resources: types.reference(ResourceChoice),
    status: types.reference(StatusChoice),
    actualCost: types.maybeNull(types.number),
    approvedVariations: types.array(ApprovedVariation),
}).views(self => ({

    get verboseName() {
        return getRoot(self).disciplineStore.names.find(name => name.id === self.name).name
    },

    get variations() {
        return getRoot(self).approvedVariationStore.getDisciplineVariations(self)
    },

})).preProcessSnapshot(snapshot => ({
    ...snapshot,
    dueDate: new Date(snapshot.dueDate),
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

        // getProjectDisciplines(project) {
        //     return self.disciplines.filter(disc => disc.project.network === project.network)
        // },

        get verboseNames() {
            return self.names.map(disciplineName => disciplineName.name)
        },

        get selectMap() {
            return self.names.map(name => ({id: name.id, display: name.name}))
        },

    })),
    createAllActions('disciplines', API_DISCIPLINES),
    createBaseActions('names')
)

export default DisciplineStore
