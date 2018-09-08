import store from '@store'
import { Client } from '@store/client'


export const setClients = (data) => {
    data.map(obj => {
        let client = Client.create({
            id: `${obj.id}`,
            name: obj.name,
            weight: obj.weight,
        })
        store.clientStore.addClient(client)
    })
}