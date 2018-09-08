import store from '@store'
import { Project } from '@store/project'


export const setProjects = (data) => {
    data.map(obj => {
        let project = Project.create({
            network: `${obj.network}`,
            name: obj.name,
            manager: `${obj.manager}`,
            client: `${obj.client}`,
            comment: obj.comment,
            businessImportance: `${obj.businessImportance}`,
            priority: obj.priority,
            status: obj.status,
        })
        store.projectStore.addProject(project)
    })
}