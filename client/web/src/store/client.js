import { types } from 'mobx-state-tree'
import createBaseActions from '@store/helpers'


export const Client = types.model('Client', {
    id: types.identifierNumber,
    name: types.string,
    weight: types.number,
}).preProcessSnapshot(snapshot => ({
    id: snapshot.id,
    name: snapshot.name,
    weight: snapshot.weight,
}))


const ClientStore = types.compose(
    types.model('ClientStore', {
        clients: types.array(Client)
    }),
    createBaseActions('clients')
)

export default ClientStore
