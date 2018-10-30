import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Cell } from '../Models'


@observer
class TableCell extends React.Component {
    @observable cell = new Cell(this.props.column, this.props.row)

    constructor(props) {
        super(props)

        this.cellStyle = this.cellStyle.bind(this)
    }

    componentDidMount() {
        this.cell.value = this.props.data
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.cell.value = this.props.data
        }
    }

    cellStyle() {
        if (this.cell.isEmpty) {
            return this.cell.style.empty
        } else {
            let result = { ...this.cell.style.standard }
            if (this.cell.style.hasConditionals) {
                result = {...result, ...this.cell.style.conditionals(this.props.data)}
            }

            return result
        }
    }

    render() {
        return (
            <td className={this.props.className} style={this.cellStyle()} >
                {this.cell.value}
            </td>
        )
    }
}

export default TableCell
