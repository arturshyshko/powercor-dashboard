import { observable, computed, autorun } from 'mobx'


class Cell {
    @observable _value = null
    @observable isEmpty = true
    @observable column
    @observable row

    constructor(column=null, row=null, type='string', defaultEmpty) {
        this.type = type
        this.column = column
        this.row = row
        this.defaultEmpty = defaultEmpty
        autorun(() => {this.isEmpty = this._value == null})
    }

    @computed get id() {
        return `${this.column.id}-${this.row.id}`
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
}

export default Cell
