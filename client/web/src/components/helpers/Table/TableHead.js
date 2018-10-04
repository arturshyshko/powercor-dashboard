import React, {Fragment} from 'react'
import {observer} from 'mobx-react'

import {buildHeaderStructure} from './methods'


@observer
class TableHead extends React.Component {
    constructor(props) {
        super(props)

        this.buildHeader = this.buildHeader.bind(this)
        this.setColumnRowSpan = this.setColumnRowSpan.bind(this)
    }

    setColumnRowSpan(column, maxDepth) {
        switch (column.rowSpan) {
            case 0:
                column.rowSpan = maxDepth
                break
            case -1:
                column.rowSpan = maxDepth - column.depth
                break
            default:
        }
    }

    buildHeader(header) {
        const maxDepth = Math.max(...Object.keys(header).map(key => parseInt(key))) + 1
        const rows = Object.values(header)
        Object.values(header).forEach(row => row.forEach(col => this.setColumnRowSpan(col, maxDepth)))

        return (
            <Fragment>
                {rows.map(row => (
                    <tr className={this.props.className}>
                        {row.map(cell => (
                            <th
                                className={this.props.cellClassName}
                                style={cell['style']}
                                rowSpan={cell.rowSpan || 1}
                                colSpan={cell['childrenAmount'] || 1}
                            >
                                {cell['header']}
                            </th>
                        ))}
                    </tr>
                ))}
            </Fragment>
        )
    }

    render() {
        return (
            this.buildHeader(buildHeaderStructure(this.props.columns))
        )
    }
}

export default TableHead
