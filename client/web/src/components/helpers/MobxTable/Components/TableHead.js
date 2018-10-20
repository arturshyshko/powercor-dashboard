import React, { Fragment } from 'react'
import { observer } from 'mobx-react'


@observer
class TableHead extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        const { header, className, cellClassName } = this.props
        return (
            <thead className={className}>
                {
                    Object.values(header.layers).map((layer, i) => (
                        <tr key={`h${i}`}>
                            {
                                layer.map((column, i) => (
                                    <th
                                        key={`hl${i}`}
                                        className={cellClassName}
                                        tableid={column.id}
                                        rowSpan={column.rowSpan}
                                        colSpan={column.colSpan}
                                        onClick={this.props.onColumnClick}
                                    >{column.name}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
        )
    }
}

export default TableHead
