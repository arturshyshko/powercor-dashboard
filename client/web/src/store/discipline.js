import { types } from 'mobx-state-tree'

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
})


const DisciplineStore = types.model('DisciplineStore', {
    disciplines: types.array(Discipline)
}).views(self => ({

})).actions(self => {

    function addDiscipline(discipline) {
        self.disciplines.push(discipline)
    }

    return { addDiscipline, }
})

export default DisciplineStore
