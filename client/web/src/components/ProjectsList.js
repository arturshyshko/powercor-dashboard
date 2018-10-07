import React, {Fragment} from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import '../App.css'

import ReactTable from 'react-table'
import ProjectsTable from '@components/helpers/Table'

import { safeProps } from '@services/attributesProcessors'
import './helpers/MobxTable'
import { MobxTable } from './helpers/MobxTable'


@inject('store')
@observer
export class ProjectsList extends React.Component {

    constructor(props) {
        super(props)
        this.projectColumns = this.projectColumns.bind(this)
        this.disciplineColumns = this.disciplineColumns.bind(this)
    }

// TODO: I should probably make special class for columns which will deal with a lot of stuff
// For example put empty styling for all column children
    projectColumns(project) {
        let result = {
            0: {
                header: 'Name',
                accessor: project => `${project.network} ${project.name}`,
                style: {whiteSpace: 'noWrap'},
            },
            1: {
                header: 'DM',
                accessor: project => `${project.manager.name || 'N/A'}`,
            },
        }

        this.props.store.disciplineStore.names.forEach((verbose, i) => (
            this.disciplineColumns(verbose, project, result, i + 2)
        ))

        return result
    }

    disciplineColumns(disciplineName, project, object, i) {
        object[i] = {
            header: disciplineName.name,
            columns: {
                0: {
                    header: 'Stage',
                    accessor: project => safeProps(project.disciplines[disciplineName.id], 'stage.name'),
                    empty: {
                        style: {backgroundColor: '#aeb1b7', borderRight: '0px'}
                    },
                },
                1: {
                    header: 'Due Date',
                    accessor: project => moment(safeProps(project.disciplines[disciplineName.id], 'dueDate', new Date()))
                        .format('DD-MM-YYYY'),
                    style: {whiteSpace: 'noWrap'},
                    empty: {
                        style: {backgroundColor: '#aeb1b7', border: '0px'}
                    },
                },
                2: {
                    header: 'Resources',
                    accessor: project => safeProps(project.disciplines[disciplineName.id], 'resources.name'),
                    empty: {
                        style: {backgroundColor: '#aeb1b7', border: '0px'}
                    },
                },
                3: {
                    header: 'Budget Cost',
                    accessor: project => safeProps(project.disciplines[disciplineName.id], 'budget'),
                    empty: {
                        style: {backgroundColor: '#aeb1b7', borderLeft: '0px'}
                    },
                },
            },
        }
    }

    render() {
        const { projects } = this.props.store.projectStore

        const columns = [
            {
                header: 'LOL',
                accessor: project => project.name,
            },
            {
                header: 'WUT',
                accessor: project => project.manager.name,
            },
            {
                header: 'DISCIPLINE',
                columns: [
                    {
                        header: 'Stage',
                        accessor: project => project.disciplines['PD'].stage.name
                    },
                    {
                        header: 'Due Date',
                        accessor: project => moment(project.disciplines['PD'].dueDate).format('DD-MM-YYYY'),
                    }
                ]
            }
        ]

        return (
            <Fragment>
                <MobxTable columns={columns} data={projects}/>
                <ProjectsTable
                    className="table table-bordered table-hover table-striped horizontal-center"
                    style={{fontSize: '10pt'}}
                    headCellClassName="vertical-center less-padding"
                    bodyCellClassName="vertical-center less-padding"
                    defaultEmpty="N/A"
                    data={projects}
                    columns={this.projectColumns()}
                />
            </Fragment>
        )
    }
}


// Possible future alternate relization for table
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
