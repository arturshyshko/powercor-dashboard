import React, { Fragment } from 'react'
import { observable, autorun } from 'mobx'
import { observer } from 'mobx-react'

import { Cell, Row } from '../Models'


@observer
class TableBody extends React.Component {
    render() {
        const { data, columns } = this.props
        return (
            <tbody>
                {data && data.map(object => <TableRow object={object} columns={columns} />)}
            </tbody>
        )
    }
}

@observer
class TableRow extends React.Component {
    @observable row = new Row(this.props.object)

    render() {
        const {object, columns} = this.props
        return (
            <tr>
                {columns.map(
                    column => (
                        <TableCell column={column} data={object} row={this.row} />
                ))}
            </tr>
        )
    }
}

@observer
class TableCell extends React.Component {
    @observable cell = new Cell(this.props.column, this.props.row)

    render() {
        this.cell.value = this.props.data
        return (
            <td>{this.cell.value}</td>
        )
    }
}

export default TableBody