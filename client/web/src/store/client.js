import { types } from 'mobx-state-tree'


export const Client = types.model('Client', {
    id: types.identifierNumber,
    name: types.string,
    weight: types.number,
})


const ClientStore = types.model('ClientStore', {
    clients: types.array(Client)
}).views(self => ({

})).actions(self => {

    function addClient(client) {
        self.clients.push(client)
    }

    return { addClient, }
})

export default ClientStore
