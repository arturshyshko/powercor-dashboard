import React, { Fragment } from 'react'
import { observer } from 'mobx-react'


@observer
class TableHead extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        const { header } = this.props
        return (
            <thead>
                {
                    Object.values(header.layers).map(layer => (
                        <tr>
                            {
                                layer.map(column => (
                                    <th
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
