import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import TableRow from './TableRow'


@observer
class TableBody extends React.Component {
    render() {
        const { data, columns } = this.props
        return (
            <tbody>
                {data && data.map((object, i) => <TableRow key={i} object={object} columns={columns} />)}
            </tbody>
        )
    }
}

export default TableBody