import React from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import '../App.css'

import ReactTable from 'react-table'
import ProjectsTable from '@components/helpers/Table'

import { safeProps } from '@services/attributesProcessors'


@inject('store')
@observer
export class ProjectsList extends React.Component {

    constructor(props) {
        super(props)
        this.projectColumns = this.projectColumns.bind(this)
        this.disciplineColumns = this.disciplineColumns.bind(this)
    }

    projectColumns(project) {
        let result = {
            0: {
                header: 'Name',
                accessor: project => `${project.network} ${project.name}`,
                style: {whiteSpace: 'noWrap'}
            },
            1: {
                header: 'DM',
                accessor: project => `${project.manager.name || 'N/A'}`,
            },
            7: {
                header: 'Comments',
                accessor: project => project.comment,
                style: {whiteSpace: 'normal'}
            },
            8 :{
                header: 'Priority',
                accessor: project => project.priority,
            }
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
                    accessor: project => {
                        if (!project.disciplines[disciplineName.id]) return 'N/A'
                        return safeProps(project.disciplines[disciplineName.id], 'stage.name')
                    },
                },
                1: {
                    header: 'Due Date',
                    accessor: project => {
                        if (!project.disciplines[disciplineName.id]) return 'N/A'
                        return moment(safeProps(project.disciplines[disciplineName.id], 'dueDate', new Date()))
                            .format('DD:MM:YYYY')
                    },
                },
                2: {
                    header: 'Resources',
                    accessor: project => {
                        if (!project.disciplines[disciplineName.id]) return 'N/A'
                        return safeProps(project.disciplines[disciplineName.id], 'resources.name')
                    },
                },
                3: {
                    header: 'Budget Cost',
                    accessor: project => {
                        if (!project.disciplines[disciplineName.id]) return 'N/A'
                        return safeProps(project.disciplines[disciplineName.id], 'budget')
                    },
                },
            },
        }
    }

    render() {
        const { projects } = this.props.store.projectStore

        return (
            <ProjectsTable
                className="table table-bordered table-hover table-striped horizontal-center"
                headCellClassName="vertical-center"
                bodyCellClassName="vertical-center"
                data={projects}
                columns={this.projectColumns()}
            />
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
