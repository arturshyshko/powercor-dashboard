import { types } from 'mobx-state-tree'

import { Project } from '@store/project'
import { Client } from '@store/client'
import {
    BusinessImportanceChoice, StatusChoice, StageChoice, ResourcesChoice
} from '@store/choice'


export const Discipline = types.model('Discipline', {
    id: types.identifier,
    name: types.string,
    project: types.reference(Project),
    stage: types.reference(StageChoice),
    budget: types.number,
    dueDate: types.Date,
    resources: types.reference(ResourcesChoice),
    status: types.reference(StatusChoice),
    actualCost: types.number,
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
