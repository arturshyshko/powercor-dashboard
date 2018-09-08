import store from '@store'
import { Manager } from '@store/manager'


export const setManagers = (data) => {
    data.map(obj => {
        let man = Manager.create({
            id: obj.id,
            name: obj.name,
        })
        store.managerStore.addManager(man)
    })
}