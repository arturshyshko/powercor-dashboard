import { types } from 'mobx-state-tree'


export const Manager = types.model('Manager', {
    id: types.identifierNumber,
    name: types.string
})


const ManagerStore = types.model('ManagerStore', {
    managers: types.array(Manager)
}).views(self => ({

})).actions(self => ({

    parseManager(obj) {
        return Manager.create({
            id: obj.id,
            name: obj.name,
        })
    },

    addManager(object) {
        self.managers.push(self.parseManager(object))
    },

    addManagers(data) {
        data.map(manager => {
            self.addManager(manager)
        })
    },

    setManager(manager) {
        // Replace old instance if the id's are the same
        // Add new one if there are no managers with this id
        let oldManager = self.managers.find(obj => obj.id === manager.id)
        if (oldManager) {
            self.oldManager = self.parseManager(manager)
        } else{
            self.addManager(manager)
        }
    },

    setManagers(data) {
        data.map(manager => {
            self.setManager(manager)
        })
    },

}))

export default ManagerStore
