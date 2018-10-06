import { types } from 'mobx-state-tree'
import createAllActions from '@store/helpers'

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
    createAllActions('managers', API_MANAGERS)
)

export default ManagerStore
