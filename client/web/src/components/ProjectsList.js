import React, {Fragment} from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import '../App.css'

import { safeProps } from '@services/attributesProcessors'
import { MobxTable } from './helpers/MobxTable'


@inject('store')
@observer
export class ProjectsList extends React.Component {

    constructor(props) {
        super(props)
        this.projectColumns = this.projectColumns.bind(this)
    }

    projectColumns() {
        return [
            {
                name: 'Name',
                value: project => `${project.network} ${project.name}`,
                style: {whiteSpace: 'noWrap'},
            },
            {
                name: 'DM',
                value: project => project.manager.name,
            },
        ].concat(
            this.props.store.disciplineStore.names.map(discipline => ({
                name: discipline.name,
                columns: [
                    {
                        name: 'Stage',
                        value: project => {
                            let disc = project.disciplines[discipline.id]
                            return disc ? disc.stage.name : 'N/A'
                        }
                    },
                    {
                        name: 'Due Date',
                        value: project => {
                            let disc = project.disciplines[discipline.id]
                            if (disc) {
                                let date = disc.dueDate
                                if (date) {
                                    return moment(date).format('DD-MM-YYYY')
                                }
                            }

                            return 'N/A'
                        },
                    }
                ]
            }))
        )
    }

    render() {
        const { projects } = this.props.store.projectStore
        return (
            <MobxTable
                className="table table-bordered table-hover table-striped horizontal-center"
                headCellClassName="vertical-center less-padding"
                bodyCellClassName="vertical-center less-padding"
                columns={this.projectColumns()}
                data={projects}
            />
        )
    }
}


// Possible future alternate realization for table
//        <Table data={projects}>
//            <Column header="Name">{project => `${project.network} ${project.name}`}</Column>
//            <Column header="DM">{project => project.manager.name}</Column>
//            <Column header="Primary Design">
//                <Column header="Stage">{project => project.disciplines['PD'].stage.name}</Column>
//                <Column header="Due Date">
//                    <Column header="Child 1">{project => project.name}</Column>
//                    <Column header="Child 2">{project => project.name}</Column>
//                </Column>
//            </Column>
//        </Table>
