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

    constructor(name, accessor, header=null, colSpan=null, rowSpan=null, layer=null, style=null, type='string', mark=null) {
        this.id = _id++
        this.mark = mark
        this.name = name
        this.initialRowSpan = rowSpan
        this.initialColSpan = colSpan
        this.initialLayer = layer
        this.header = header
        this._accessor = accessor
        // This attribute is internally used by 'style' getter and setter
        this._style = {standard: null, empty: null}
        this.style = style
        this.type = type

        autorun(() => this.children.forEach(child => {child.parent = this}))
        autorun(() => this.cells.forEach(cell => {cell.column = this}))
        autorun(() => {if (this._accessor != null) this._accessor.column = this})
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

    // TODO: somehow avoid using columns 2 times if it is both in marks and names array
    accessor(object) {
        if (this._accessor == null) {
            return null
        }

        return this._accessor.accessor(object)
    }

    // Check whether this column has children or not
    @computed get hasChildren() {
        if (this.children == null)
            return false
        if (this.children.filter(child => child != null).length === 0) {
            return false
        }
        return true
    }

    // Return inherited styling to this column cells
    @computed get style() {
        if (this.parent == null) {
            return {
                standard: {...this._style.standard},
                empty: {...this._style.empty},
            }
        } else {
            return {
                standard: {...this.parent.style.standard, ...this._style.standard},
                empty: {...this.parent.style.empty, ...this._style.empty},
            }
        }
    }

    set style(object) {
        if (object == null) {
            return
        }

        let standard = {}
        let empty = {}

        if (object.standard != null) {
            standard = object.standard
            empty = object.empty || empty
        } else {
            ({empty={}, ...standard} = {...object})
        }

        this._style = {empty, standard}
    }

    child(id) {
        return this.children.find(child => child.id === id)
    }

    removeChild(value) {
        let childIndex = null

        if (value instanceof Column) {
            childIndex = this.children.findIndex(child => child.id === value.id)
        } else {
            childIndex = this.children.findIndex(child => child.id === value)
        }

        if (childIndex != null) {
            this.children.splice(childIndex, 1)
        }
    }

    get toJSON() {
        let result = {
            id: this.id,
            name: this.name,
            accessor: this.accessor,
            header: this.header,
            children: this.children.map(child => child.toJSON),
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