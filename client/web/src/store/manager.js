import { types } from 'mobx-state-tree'
import { createBaseActions } from '@store/helpers'

import { setManagers } from '@api/managers'
import {fetchData} from '@services/apiAccess'
import {API_MANAGERS} from '@constants/apiUrls'


export const Manager = types.model('Manager', {
    id: types.identifierNumber,
    name: types.string
}).preProcessSnapshot(snapshot => ({
    id: snapshot.id,
    name: snapshot.name
}))


const ManagerStore = types.compose(
    types.model('ManagerStore', {
        managers: types.array(Manager)
    }),
    createBaseActions('managers')
).views(self => ({
    getOrLoadManager(id) {
        const manager = self.managers.find(man => man.id === id) || {}
        if (Object.keys(manager).length === 0 && manager.constructor === Object) {
            fetchData((data) => self.addManager(data), `${API_MANAGERS}${id}/`)
        }
        return manager
    }
}))

export default ManagerStore
