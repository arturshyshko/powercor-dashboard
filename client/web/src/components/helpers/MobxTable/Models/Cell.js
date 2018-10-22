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
        this._value = this.column.accessor(object)
    }

    // Get this cell's direct column style
    @computed get columnStyle() {
        return this.column.style
    }

    // Get this cell's row style
    @computed get rowStyle() {
        return this.row.style
    }

    @computed get style() {
        // If i will somehow manage to add row styling it should always take precedence over column styling
        if (this.rowStyle != null) {
            return this.rowStyle
        } else {
            return this.columnStyle
        }
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
