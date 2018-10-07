import { observable, computed, autorun } from 'mobx'
import { filterKeys } from '@services/attributesProcessors'


let _id = 0

class Column {
    @observable id
    @observable name=''
    @observable initialLayer
    @observable children = []
    @observable cells = []
    @observable parent = null

    constructor(name, accessor, header=null, colSpan=null, rowSpan=null, layer=null) {
        this.id = _id++
        this.name = name
        this.initialRowSpan = rowSpan
        this.initialColSpan = colSpan
        this.initialLayer = layer
        this.header = header
        this.accessor = accessor
        autorun(() => this.children.forEach(child => {child.parent = this}))
        autorun(() => this.cells.forEach(cell => {cell.column = this}))
    }

    @computed get colSpan() {
        if (this.initialColSpan != null) {
            return this.initialColSpan
        } else if (!this.hasChildren) {
            return 1
        } else {
            return this.children.reduce((result, child) => (result += child.colSpan), 0)
        }
    }

    @computed get rowSpan() {
        if (this.initialRowSpan != null) {
            return this.initialRowSpan
        } else if (this.header == null) {
            return null
        } else if (this.hasChildren) {
            return 1
        } else if (this.parent != null) {
            return this.header.maxLayer - this.layer + 1
        } else {
            return this.header.maxLayer + 1
        }
    }

    @computed get layer() {
        if (this.initialLayer) {
            return this.initialLayer
        } else if (this.parent != null) {
            return this.parent.layer + 1
        } else {
            return 0
        }
    }

    @computed get hasChildren() {
        if (this.children == null)
            return false
        if (this.children.length === 0) {
            return false
        }
        return true
    }

    toJSON() {
        let result = {
            id: this.id,
            name: this.name,
            accessor: this.accessor,
            header: this.header,
            children: this.children.map(child => child.toJSON())
        }

        const allowed = Object.values(arguments)
        if (allowed.length !== 0) {
            result = filterKeys(result, allowed)
        }

        return result
    }
}

export default Column
