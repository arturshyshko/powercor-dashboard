import { types } from 'mobx-state-tree'

import createAllActions from '@store/helpers'

import { API_CLIENTS } from '@constants/apiUrls'


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
    createAllActions('clients', API_CLIENTS)
)

export default ClientStore
