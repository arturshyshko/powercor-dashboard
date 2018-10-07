import React, { Fragment } from 'react'
import { observer } from 'mobx-react'


@observer
class TableHead extends React.Component {

    constructor(props) {
        super(props)

        this.buildHeader = this.buildHeader.bind(this)
    }

    buildHeader() {
        const { header } = this.props

        return (
            <Fragment>
                {
                    Object.values(header.layers).map(layer => (
                        <tr>
                            {
                                layer.map(column => (
                                    <th
                                        rowSpan={column.rowSpan}
                                        colSpan={column.colSpan}
                                    >{column.name}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </Fragment>
        )
    }

    render() {
        return (
            <thead>
                {this.buildHeader()}
            </thead>
        )
    }
}

export default TableHead
