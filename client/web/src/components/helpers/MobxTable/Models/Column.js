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
        this.isEmpty = false
        // This attribute is internally used by 'style' getter and setter
        this._style = {standard: null, empty: null, own: null, conditional: null}
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

    // TODO: this now returns not null but other value so isEmpty for cell is not working
    accessor(object) {
        // If parent column has accessor - that means it checks whether requested sub-object exists
        // If it does not exist - requested property of this non-existant sub-object should not be looked
        // Avoid 'undefined does not have property' error
        if (this._accessor == null ||
            (this.parent && this.parent._accessor != null && this.parent.accessor(object) == null)) {
            this.isEmpty = true
            if (this._accessor == null) {
                return null
            } else {
                return this._accessor.empty
            }
        }
        this.isEmpty = false
        return this._accessor.value(object)
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

    @computed get ancestors() {
        if (this.parent != null) {
            return [].concat(this.parent.ancestors, this.parent).filter(elem => elem != null)
        } else {
            return []
        }
    }

    // Return inherited styling to this column cells
    @computed get style() {
        if (this.parent == null) {
            return this._style
        } else {
            return {
                standard: {...this.parent.style.standard, ...this._style.standard},
                empty: {...this.parent.style.empty, ...this._style.empty},
                conditional: {...this._style.conditional},
                own: {...this._style.own},
            }
        }
    }

    set style(object) {
        if (object == null) {
            return null
        }

        let { empty={}, own={}, conditional={}, standard } = {...object}
        if (standard == null) {
            standard = {...object}
        }
        console.log(123, empty)
        this._style = {empty, own, conditional, standard}
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
