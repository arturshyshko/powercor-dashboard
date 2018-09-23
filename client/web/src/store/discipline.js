import { types, getRoot } from 'mobx-state-tree'

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
}))


export const DisciplineName = types.model('DisciplineName', {
    id: types.identifier,
    name: types.string,
})


const DisciplineStore = types.model('DisciplineStore', {
    disciplines: types.array(Discipline),
    names: types.array(DisciplineName),
}).views(self => ({

    getProjectDisciplines(project) {
        return self.disciplines.filter(disc => disc.project.network === project.network)
    },

    get verboseNames() {
        return self.names.map(disciplineName => disciplineName.name)
    }

})).actions(self => ({

    parseDiscipline(obj) {
        return Discipline.create({
            id: obj.id,
            name: obj.name,
            project: obj.project,
            stage: obj.stage,
            budget: obj.budget,
            dueDate: new Date(obj.dueDate),
            resources: obj.resources,
            status: obj.status,
            actualCost: obj.actualCost,
        })
    },

    addDiscipline(object) {
        self.disciplines.push(self.parseDiscipline(object))
    },

    addDisciplines(data) {
        data.map(discipline => {
            self.addDiscipline(discipline)
        })
    },

    setDiscipline(discipline) {
        // Replace old instance if the id's are the same
        // Add new one if there are no managers with this id
        let oldDiscipline = self.disciplines.find(obj => obj.id === discipline.id)
        if (oldDiscipline) {
            self.oldDiscipline = self.parseDiscipline(discipline)
        } else{
            self.addDiscipline(discipline)
        }
    },

    setDisciplines(data) {
        data.map(discipline => {
            self.setDiscipline(discipline)
        })
    },


    parseDisciplineName(obj) {
        return DisciplineName.create({
            id: obj['id'] || obj[0],
            name: obj['name'] || obj[1],
        })
    },

    addDisciplineName(object) {
        self.names.push(self.parseDisciplineName(object))
    },

    setDisciplineName(name) {
        let oldName = self.names.find(obj => obj.id === name.id)
        if (oldName) {
            self.oldName = self.parseDisciplineName(name)
        } else{
            self.addDisciplineName(name)
        }
    },

    setDisciplineNames(data) {
        data.map(name => {
            self.setDisciplineName(name)
        })
    },

}))

export default DisciplineStore
