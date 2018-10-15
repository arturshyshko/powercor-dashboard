import { observable, computed, autorun } from 'mobx'


class Cell {
    @observable _value = null
    @observable isEmpty = true
    @observable column
    @observable row

    constructor(column=null, row=null, defaultEmpty) {
        this.column = column
        this.row = row
        this.defaultEmpty = defaultEmpty
        autorun(() => this.column.cells.push(this))
        autorun(() => {this.isEmpty = this._value == null})
    }

    @computed get id() {
        return `${this.column.id}-${this.row.id}`
    }

    @computed get type() {
        return this.column.type
    }

    get emptyValue() {
        if (this.defaultEmpty) {
            return this.defaultEmpty
        }

        switch(this.type) {
            default:
            return ''
        }
    }

    @computed get value() {
        if (this.isEmpty) {
            return this.emptyValue
        } else {
            return this._value
        }
    }

    set value(object) {
        if (this.column != null) {
            this._value = this.column.accessor(object)
        }
    }

    // Get this cell's direct column style
    @computed get columnStyle() {
        return this.column.style
    }

    // Get this cell's row style
    @computed get rowStyle() {
        return this.row.style
    }

    // Get style which is used if cell value is empty - isEmpty === true
    @computed get emptyStyle() {
        return this.column && this.column.style && this.column.style.empty
    }

    // Get resultive inherited style from all parentive columns
    @computed get parentStyle() {
        return this.column && this.column.inheritedStyle
    }

    // delete() {
    //     if (this.column != null) {
    //         this.column.cells.splice(this.column.cells.findIndex(cell => cell.id === this.id), 1)
    //     }
    //     if (this.row != null) {
    //         this.row.cells.splice(this.row.cells.findIndex(cell => cell.id === this.id), 1)
    //     }
    // }
}

export default Cell
