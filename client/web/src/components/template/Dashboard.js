import React from 'react'
import { observer, inject } from 'mobx-react'


@inject('store')
@observer
class Dashboard extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        )
    }
}

export default Dashboard
