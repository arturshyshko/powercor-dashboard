import { types } from 'mobx-state-tree'


export const Manager = types.model('Manager', {
    id: types.identifierNumber,
    name: types.string
})


const ManagerStore = types.model('ManagerStore', {
    managers: types.array(Manager)
}).views(self => ({

})).actions(self => {

    function addManager(manager) {
        self.managers.push(manager)
    }

    return { addManager, }
})

export default ManagerStore
