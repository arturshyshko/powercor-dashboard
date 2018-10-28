import React, {Fragment} from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import '../App.css'

import { safeProps } from '@services/attributesProcessors'
import { MobxTable } from './helpers/MobxTable'


@inject('store')
@observer
class ProjectsList extends React.Component {

    constructor(props) {
        super(props)
        this.projectColumns = this.projectColumns.bind(this)
    }

    projectColumns() {
        return [
            {
                name: 'Project',
                value: project => `${project.network} ${project.name}`,
                style: {whiteSpace: 'noWrap'},
            },
            {
                name: 'DM',
                value: project => project.manager.initials,
            },
        ].concat(
            this.props.store.disciplineStore.names.map(discipline => ({
                name: discipline.name,
                value: {
                    empty: 'N/A',
                    accessor: project => project.disciplines[discipline.id],
                },
                style: {
                    own: {
                        borderLeft: '1px solid black',
                        borderRight: '1px solid black',
                    },
                    empty: {
                        backgroundColor: 'red',
                    },
                },
                children: [
                    {
                        name: 'Stage',
                        value: project => project.disciplines[discipline.id].stage.name,
                        style: {
                            borderLeft: '1px solid black',
                            own: {
                                borderLeft: '1px solid black',
                            },
                        },
                    },
                    {
                        name: 'Due Date',
                        value: project => moment(project.disciplines[discipline.id].dueDate).format('DD-MM-YYYY'),
                        style: {
                            borderRight: '1px solid black',
                            own : {
                                borderRight: '1px solid black',
                            },
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

export default ProjectsList


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
