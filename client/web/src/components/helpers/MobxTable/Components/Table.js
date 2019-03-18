import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { Header, History } from '../Models'
import TableHead from './TableHead'
import TableBody from './TableBody'


@observer
class MobxTable extends React.Component {
    @observable header = new Header()
    @observable history = new History()

    constructor(props) {
        super(props)
        this.setHeader = this.setHeader.bind(this)
        this.hideColumn = this.hideColumn.bind(this)
    }

    componentDidMount() {
        this.setHeader(this.props.columns)
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.columns !== prevProps.columns) {
    //         this.setHeader(this.props.columns)
    //     }
    // }

    setHeader(columns) {
        if (columns != null) {
            this.header.setColumns(columns)
            this.history.push(this.header)
        }
    }

    hideColumn(id) {
        // this.header.column(id)
        // TODO either pass new 'history' prop which will save snapshots of header
        // or use mobx-state-tree for all entities in this module...

        // There are a lot of bugs with this method
        // TODO: fix cells wrong order after deletion, parent not being deleted if no children left
        this.header.delete(id)
        // TODO: need to use createTransform to create new object from current header and push it to history
        this.history.push(this.header)
    }

    render() {
        const { data, className, headClassName, headCellClassName, bodyClassName, bodyCellClassName, handleClick } = this.props

        return (
            <table className={className} >
               <TableHead
                   header={this.header}
                   className={headClassName}
                   cellClassName={headCellClassName}
               />
               <TableBody
                   data={data}
                   handleClick={handleClick}
                   columns={this.header.appliedColumns}
                   className={bodyClassName}
                   cellClassName={bodyCellClassName}
               />
            </table>
        )
    }
}

export default MobxTable