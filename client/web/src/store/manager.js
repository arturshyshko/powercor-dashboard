import { types } from 'mobx-state-tree'
import createBaseActions from '@store/helpers'


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
)

export default ManagerStore
