import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Row } from '../Models'
import TableCell from './TableCell'


@observer
class TableRow extends React.Component {
    @observable row = new Row(this.props.object)

    render() {
        const {object, columns} = this.props
        return (
            <tr>
                {columns.map(
                    (column, i) => (
                        <TableCell key={`${column.id}-${i}`} column={column} data={object} row={this.row} />
                ))}
            </tr>
        )
    }
}

export default TableRow
