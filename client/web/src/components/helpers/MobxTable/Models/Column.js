import { observable, computed, autorun } from 'mobx'
import { filterKeys } from '@services/attributesProcessors'


let _id = 0

class Column {
    @observable id
    @observable name=''
    @observable initialLayer
    @observable children = {}
    @observable cells = []
    @observable parent = null

    constructor(name, accessor, header=null, colSpan=null, rowSpan=null, layer=null, style=null, type='string') {
        this.id = _id++
        this.name = name
        this.initialRowSpan = rowSpan
        this.initialColSpan = colSpan
        this.initialLayer = layer
        this.header = header
        this.accessor = accessor
        this.style = style
        this.type = type

        autorun(() => this.children.columns.forEach(child => {child.parent = this}))
        autorun(() => this.cells.forEach(cell => {cell.column = this}))
    }

    @computed get colSpan() {
        if (this.initialColSpan != null) {
            return this.initialColSpan
        } else if (!this.hasChildren) {
            return 1
        } else {
            return this.children.columns.reduce((result, child) => (result += child.colSpan), 0)
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

    // Function to check whether this column has children or not
    @computed get hasChildren() {
        if (this.children.columns == null)
            return false
        if (this.children.columns.filter(child => child != null).length === 0) {
            return false
        }
        return true
    }

    // Function to return inherited styling to this column cells
    @computed get inheritedStyle() {
        // If this column has no parents - return styling from children attribute
        // Otherwise append styling from children attribute to same styling in parentive column
        if (this.parent == null) {
            return this.children.style
        } else {
            return { ...this.parent.inheritedStyle, ...this.children.style }
        }
    }

    child(id) {
        return this.children.columns.find(child => child.id === id)
    }

    removeChild(value) {
        let childIndex = null

        if (value instanceof Column) {
            childIndex = this.children.columns.findIndex(child => child.id === value.id)
        } else {
            childIndex = this.children.columns.findIndex(child => child.id === value)
        }

        if (childIndex != null) {
            this.children.columns.splice(childIndex, 1)
        }
    }

    get toJSON() {
        let result = {
            id: this.id,
            name: this.name,
            accessor: this.accessor,
            header: this.header,
            children: this.children.columns.map(child => child.toJSON),
            cells: this.cells
        }

        const allowed = Object.values(arguments)
        if (allowed.length !== 0) {
            result = filterKeys(result, allowed)
        }

        return result
    }

    // delete() {
    //     if (this.cells.length !== 0) {
    //         this.cells.forEach(cell => cell.delete())
    //     }
    // }
}

export default Column
