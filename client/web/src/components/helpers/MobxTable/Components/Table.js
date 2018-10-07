import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Header, Column, Cell, Row } from '../Models'
import TableHead from './TableHead'
import TableBody from './TableBody'


@observer
class MobxTable extends React.Component {
    @observable header = new Header()

    constructor(props) {
        super(props)
        this.createHeader = this.createHeader.bind(this)
        this.hideColumn = this.hideColumn.bind(this)
    }

    createHeader(columns) {
        if (columns != null) {
            this.header.setColumns(columns)
        }
    }

    hideColumn(id) {
        // this.header.column(id)
        // TODO either pass new 'history' prop which will save snapshots of header
        // or use mobx-state-tree for all entities in this module...
    }

    render() {
        this.createHeader(this.props.columns)
        return (
            <table>
               <TableHead header={this.header}></TableHead>
               <TableBody data={this.props.data} columns={this.header.appliedColumns} />
            </table>
        )
    }
}

export default MobxTable