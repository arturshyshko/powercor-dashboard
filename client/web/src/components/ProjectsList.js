import React from 'react'
import { observer, inject } from 'mobx-react'
import '../App.css'

import moment from 'moment'

import ReactTable from 'react-table'

import { createColumn, filterColumns } from '@helpers/table'
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
        let result = [
                {
                    id: 'projectName',
                    Header: 'Name',
                    accessor: project => `${project.network} ${project.name}`,
                },
                {
                    id: 'projectManager',
                    Header: 'DM',
                    accessor: project => `${safeProps(project, 'manager.name', 'N/A')}`,
                }
            ]

        this.props.store.disciplineStore.names.map((verbose) => {
            result.push(this.disciplineColumns(verbose, project))
        })

        // result.push({
        //     id: 'projectPriority',
        //     Header: 'Priority',
        //     accessor: project => project.priority,
        // })

        result.push({
            id: 'projectComments',
            Header: 'Comments',
            accessor: project => project.comment,
            style: {whiteSpace: 'normal'}
        })

        return result
    }

    disciplineColumns(disciplineName, project) {
        return {
            Header: disciplineName.name,
            columns: [
                {
                    id: `project${disciplineName.name}Stage`,
                    Header: 'Stage',
                    accessor: project => {
                        if (!project.disciplines[disciplineName.id]) return 'N/A'
                        return safeProps(project.disciplines[disciplineName.id], 'stage.name')
                    },
                },
                {
                    id: `project${disciplineName.name}DueDate`,
                    Header: 'Due Date',
                    accessor: project => {
                        if (!project.disciplines[disciplineName.id]) return 'N/A'
                        return moment(safeProps(project.disciplines[disciplineName.id], 'dueDate', new Date()))
                            .format('DD:MM:YYYY')
                    },
                },
                // {
                //     id: `project${disciplineName.name}Resources`,
                //     Header: 'Resources',
                //     accessor: project => {
                //         if (!project.disciplines[disciplineName.id]) return 'N/A'
                //         return safeProps(project.disciplines[disciplineName.id], 'resources.name')
                //     },
                // },
                // {
                //     id: `project${disciplineName.name}Budget`,
                //     Header: 'Budget Cost',
                //     accessor: project => {
                //         if (!project.disciplines[disciplineName.id]) return 'N/A'
                //         return safeProps(project.disciplines[disciplineName.id], 'budget')
                //     },
                // },
            ],
        }
    }

    render() {

        return (
            <React.Fragment>
                <ReactTable
                    data={[...this.props.store.projectStore.projects]}
                    columns={this.projectColumns()}
                    className="-striped -highlight"
                    style={{textAlign: 'center',}}
                />
            </React.Fragment>
        )
    }
}

// <React.Fragment>
//     <table className="table table-bordered table-hover table-striped"
//            style={{textAlign: 'center', marginTop: '20px'}}>
//         <thead style={{textAlign: 'center'}}>
//             <tr>
//                 <th rowSpan="2" style={{verticalAlign: 'middle', whiteSpace: 'nowrap'}}>Name</th>
//                 <th rowSpan="2" style={{verticalAlign: 'middle'}}>Manager</th>
//                 {
//                     this.props.store.disciplineStore.names.map((name, i) => (
//                         <th key={i} colSpan="2" style={{verticalAlign: 'middle'}}>{name.name}</th>
//                     ))
//                 }
//                 <th rowSpan="2" style={{verticalAlign: 'middle'}}>Priority</th>
//                 <th rowSpan="2" style={{verticalAlign: 'middle'}}>Comments</th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//                 this.props.store.projectStore.projects.map((project, i) => (
//                     <tr key={i} >
//                         <td style={{verticalAlign: 'middle', whiteSpace: 'nowrap'}}>{project.network + ' ' + project.name}</td>
//                         <td>{project.manager.name}</td>
//                         {
//                             this.props.store.disciplineStore.names.map((disciplineName, i) => {
//                                 let discipline = project.disciplines[disciplineName.id]
//                                 if (!discipline) return [
//                                     <td className="border-left">N/A</td>,
//                                     <td className="border-right">N/A</td>
//                                 ]
//                                 return [
//                                     <td key={i} className="border-left">{safeProps(discipline, 'stage.name')}</td>,
//                                     <td key={i + 5} className="border-right">{moment(safeProps(discipline, 'dueDate', new Date())).format('DD-MM-YYYY')}</td>
//                                 ]
//                             })
//                         }
//                         <td>{project.comment}</td>
//                         <td>{project.priority}</td>
//                     </tr>
//                     ))
//             }
//         </tbody>
//     </table>
// </React.Fragment>
//
