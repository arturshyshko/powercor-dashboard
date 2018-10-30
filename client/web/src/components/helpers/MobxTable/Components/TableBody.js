import React from 'react'
import { observer } from 'mobx-react'

import TableRow from './TableRow'


@observer
class TableBody extends React.Component {
    render() {
        const { data, columns, className, cellClassName } = this.props
        return (
            <tbody>
                {data &&
                    data.map((object, i) => (
                        <TableRow
                        className={className}
                        cellClassName={cellClassName}
                        key={i}
                        object={object}
                        columns={columns} />
                    ))
                }
            </tbody>
        )
    }
}

export default TableBody