import React, {Fragment} from 'react'
import {observer} from 'mobx-react'
import moment from 'moment'
import { safeProps } from '@services/attributesProcessors'


@observer
class TableRow extends React.Component {
    constructor(props) {
        super(props)

        this.buildCell = this.buildCell.bind(this)
    }

    buildCell(column) {
        const {tableid, data, defaultEmpty, cellClassName} = this.props

        const id = `${tableid}-${column.position}`
        let style = {...column.style}

        const value = column.accessor(data)
        let result = value

        if (value == null || value === '') {
            style = {...style, ...safeProps(column, 'empty.style', {})}
            result = safeProps(column, 'empty.value') || defaultEmpty || ''
        }

        return (
            <td tableid={id} className={cellClassName} style={style}>
                {result}
            </td>
        )
    }

    render() {
        const { tableid, className, cellClassName, data, columns } = this.props

        return (
            <tr tableid={tableid} className={className}>
                {columns.map((column, i) => (
                    this.buildCell(column)
                ))}
            </tr>
        )
    }
}

export default TableRow
