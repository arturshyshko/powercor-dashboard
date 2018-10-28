import React, {Fragment} from 'react'
import { observer, inject } from 'mobx-react'
import '../App.css'


import { ProjectEdit } from '@components/forms/ProjectEdit'
import { ProjectsList, FinancialReport } from '@components/tables'


@inject('store')
@observer
export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showCreate: false,
        }

        this.toggleCreate = this.toggleCreate.bind(this)
    }

    toggleCreate() {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    render() {
        return(
            <Fragment>
                <div className="container-fluid">
                    {this.state.showCreate &&
                        <ProjectEdit />
                    }
                    <ProjectsList />
                    <FinancialReport />
                </div>
            </Fragment>
        )
    }
}