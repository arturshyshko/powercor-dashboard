import React from 'react'
import { observer, inject } from 'mobx-react'

import { MobxTable } from '@components/helpers/MobxTable'
import { projectName, projectManager } from '@components/tables/columns'


const resourcesMap = [
    {
        name: 'No Resources',
        color: 'red',
    },
    {
        name: 'Under Resourced',
        color: 'yellow',
    },
]

@inject('store')
@observer
class ResourceAllocation extends React.Component {
    constructor(props) {
        super(props)

        this.resourceColumns = this.resourceColumns.bind(this)
        this.filterProjects = this.filterProjects.bind(this)
    }

    resourceColumns() {
        return [
            projectName,
            projectManager,
        ].concat(
            this.props.store.disciplineStore.names.map(discipline => ({
                name: discipline.name,
                value: {
                    empty: 'N/A',
                    accessor: project => project.getDiscipline(discipline.id)
                        && project.getDiscipline(discipline.id).resources.name,
                },
                style: {
                    empty: {
                        backgroundColor: 'gray'
                    },
                    conditionals: resourcesMap.map(res => ({
                        condition: project => {
                            const disc = project.getDiscipline(discipline.id)
                            return disc.resources && disc.resources.name === res.name
                        },
                        style: {
                            backgroundColor: res.color
                        }
                    }))
                }
            }))
        )
    }

    filterProjects() {
        return this.props.store.projectStore.projects.filter( project => (
            Object.values(project.disciplines).some(discipline => (
                resourcesMap.map(res => res.name)
                    .includes(discipline.resources && discipline.resources.name)
            ))
        ))
    }

    render() {
        return (
            <MobxTable
                data={this.filterProjects()}
                columns={this.resourceColumns()}
                className="table table-bordered table-hover table-striped horizontal-center"
                headCellClassName="vertical-center less-padding"
                bodyCellClassName="vertical-center less-padding"
            />
        )
    }
}

export default ResourceAllocation
