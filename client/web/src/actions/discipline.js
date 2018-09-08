import store from '@store'
import { Discipline } from '@store/discipline'


export const setDisciplines = (data) => {
    data.map(obj => {
        let discipline = Discipline.create({
            id: `${obj.id}`,
            name: obj.name,
            project: `${obj.project}`,
            stage: `${obj.stage}`,
            budget: obj.budget,
            dueDate: obj.dueDate,
            resources: `${obj.resources}`,
            status: `${obj.status}`,
            actualCost: obj.actualCost,
        })
        store.disciplineStore.addDiscipline(discipline)
    })
}