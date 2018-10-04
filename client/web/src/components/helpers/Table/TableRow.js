import React, {Fragment} from 'react';
import {observer} from 'mobx-react'


@observer
class TableRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { tableid, className, data, columns } = this.props

        return (
            <tr tableid={tableid}>
                {columns.map((column, i) => {
                    return (
                        <td
                            key={i}
                            tableid={`${tableid}-${column['position']}`}
                            className={className}
                            style={column['style']}
                        >
                            {column['accessor'](data)}
                        </td>
                    )
                })}
            </tr>
        )
    }
}

export default TableRow
