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
        this.columns.find(column => column.id === id)
    }

    setColumns(objects) {
        parseColumns(objects, this.columns)
    }
}

export default Header
