import React from 'react'
import { observer, inject } from 'mobx-react'

import TableRow from './TableRow'
import TableHead from './TableHead'

import { flattenColumns } from './methods'


@observer
class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            data, columns, defaultEmpty,
            className, style,
            headClassName, headCellClassName,
            bodyClassName, bodyRowClassName, bodyCellClassName
        } = this.props

        return (
            <table className={className} style={style}>
                <thead className={headClassName}>
                    <TableHead
                        columns={columns}
                        className={headClassName}
                        cellClassName={headCellClassName}
                    />
                </thead>
                <tbody className={bodyClassName}>
                    {
                        data.map((object, index) => (
                            <TableRow
                                key={index}
                                className={bodyRowClassName}
                                cellClassName={bodyCellClassName}
                                columns={flattenColumns(columns)}
                                tableid={index + 1}
                                data={object}
                                defaultEmpty={defaultEmpty}
                            />
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default Table
