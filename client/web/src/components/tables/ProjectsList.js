import React, { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import moment from 'moment'
import { safeProps } from '@services/attributesProcessors'

import { MobxTable } from '@components/helpers/MobxTable'
import { projectName, projectManager } from '@components/tables/columns'

import { ProjectEditPopup } from '@components/popup/Popup'


@inject('store')
@observer
class ProjectsList extends React.Component {

    @observable isPopupOpen = false

    constructor(props) {
        super(props)
        this.projectColumns = this.projectColumns.bind(this)
    }

    projectColumns() {
        return [
            projectName,
            projectManager,
        ].concat(
            this.props.store.disciplineStore.names.map(discipline => ({
                name: discipline.name,
                value: {
                    empty: 'N/A',
                    accessor: project => project.getDiscipline(discipline.id),
                },
                style: {
                    header: {
                        borderLeft: '1px solid black',
                        borderRight: '1px solid black',
                    },
                    empty: {
                        backgroundColor: 'gray',
                    },
                },
                children: [
                    {
                        name: 'Stage',
                        value: project => safeProps(project.getDiscipline(discipline.id), 'stage.name', 'N/A'),
                        style: {
                            borderLeft: '1px solid black',
                            header: {
                                borderLeft: '1px solid black',
                            },
                            empty: {
                                borderRight: '1px solid gray',
                            }
                        },
                    },
                    {
                        name: 'Due Date',
                        value: project => moment(project.getDiscipline(discipline.id).dueDate).format('DD-MM-YYYY'),
                        style: {
                            borderRight: '1px solid black',
                            header : {
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
            <Fragment>
                <MobxTable
                    className="table table-bordered table-hover table-striped horizontal-center"
                    headCellClassName="vertical-center less-padding"
                    bodyCellClassName="vertical-center less-padding"
                    columns={this.projectColumns()}
                    data={projects}
                    handleClick={() => {this.isPopupOpen = true}}
                />
                <ProjectEditPopup isOpen={this.isPopupOpen} handleClose={() => {this.isPopupOpen = false}} project={projects[0]} />
            </Fragment>
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
