import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Row } from '../Models'
import TableCell from './TableCell'


@observer
class TableRow extends React.Component {
    @observable row = new Row(this.props.object)

    render() {
        const {object, columns, className, cellClassName, handleClick } = this.props
        return (
            <tr className={className} onClick={handleClick} >
                {columns.map(
                    (column, i) => (
                        <TableCell
                            key={`${column.id}-${i}`}
                            className={cellClassName}
                            column={column}
                            data={object}
                            row={this.row}
                        />
                ))}
            </tr>
        )
    }
}

export default TableRow
