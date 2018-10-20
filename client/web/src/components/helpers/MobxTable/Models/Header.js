import { observable, computed, autorun } from 'mobx'

import {parseColumns} from '../Methods/translators'


// Base header structure for table which will be then parsed into thead
// It looks like object with number attributes
// Each number attribute is an array with columns
// Columns are pushed to corresponding layer dependingly on their parents amount
class Header {
    @observable columns = []

    constructor(columns=[]) {
        this.columns = columns
        autorun(() => this.columns.forEach(column => {column.header = this}))
    }

    @computed get maxLayer() {
        return this.columns.reduce((result, column) => (
            result > column.layer ? result : column.layer
        ))
    }

    @computed get layers() {
        return this.columns.reduce((obj, column) => {
            obj[column.layer] = [].concat(obj[column.layer], column).filter(elem => elem !=null)
            return obj
        }, {})
    }

    @computed get appliedColumns() {
        return this.columns.filter(column => column.hasChildren === false)
    }

    column(id) {
        return this.columns.find(column => column.id == id)
    }

    setColumns(objects) {
        return parseColumns(objects, this.columns)
    }

    get toJSON() {
        return this.columns.map(column => column.toJSON)
    }

    delete(id) {
        const column = this.column(id)
        if (column) {
            if (column.hasChildren) {
                // Currently we do nothing if this column has children
                return
                // TODO remove children of this column if it is clicked

                // Remove children from the end of array due to index changes
                // Tried this - some unexpected bug where i delete another random column

                // column.children.parent = null
            }
            column.delete()
            if (column.parent != null) {
                if (column.parent.hasChildren === false) {
                    this.delete(column.parent.id)
                }
            }
            this.columns.splice(this.columns.findIndex(col => col.id == column.id), 1)
        }
    }
}

export default Header
