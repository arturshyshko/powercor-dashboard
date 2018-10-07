import { observable, computed, autorun } from 'mobx'

let _id = 0

class Row {
    @observable id
    @observable data = null
    @observable cells = []

    constructor(data=null) {
        this.id = _id++
        this.data = data
        autorun(() => this.cells.forEach(cell => {cell.row = this}))
    }

    childrenOf(parent) {
        return this.cells.filter(cell => cell.parent === parent)
    }

}

export default Row
