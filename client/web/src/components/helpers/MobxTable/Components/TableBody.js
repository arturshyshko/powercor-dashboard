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
        console.log(columns.map(col => col.toJSON))
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

    constructor(props) {
        super(props)

        this.cellStyle = this.cellStyle.bind(this)
    }

    componentDidMount() {
        this.cell.value = this.props.data
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.cell.value = this.props.data
        }
    }

    cellStyle() {
        if (this.cell.isEmpty) {
            return this.cell.emptyStyle
        } else {
            return this.cell.columnStyle
        }
    }

    render() {
        return (
            <td
                style={this.cellStyle()}
            >
                {this.cell.value}
            </td>
        )
    }
}

export default TableBody