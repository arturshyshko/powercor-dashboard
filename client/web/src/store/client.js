import { types } from 'mobx-state-tree'


export const Client = types.model('Client', {
    id: types.identifierNumber,
    name: types.string,
    weight: types.number,
})


const ClientStore = types.model('ClientStore', {
    clients: types.array(Client)
}).views(self => ({

})).actions(self => ({
    parseClient(obj) {
        return Client.create({
            id: obj.id,
            name: obj.name,
            weight: obj.weight,
        })
    },

    addClient(object) {
        self.clients.push(self.parseClient(object))
    },

    addClients(data) {
        data.map(client => {
            self.addClient(client)
        })
    },

    setClient(client) {
        // Replace old instance if the id's are the same
        // Add new one if there are no clients with this id
        let oldClient = self.clients.find(obj => obj.id === client.id)
        if (oldClient) {
            self.oldClient = self.parseClient(client)
        } else{
            self.addClient(client)
        }
    },

    setClients(data) {
        data.map(client => {
            self.setClient(client)
        })
    },
}))

export default ClientStore
