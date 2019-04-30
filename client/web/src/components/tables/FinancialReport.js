import React from 'react'
import { observer, inject } from 'mobx-react'
import { MobxTable } from '@components/helpers/MobxTable'
import { projectName, projectManager } from '@components/tables/columns'

@inject('store')
@observer
class FinancialReport extends React.Component {
    render() {
        const { projects } = this.props.store.projectStore
        const columns = [
            projectName,
            projectManager,
        ].concat(
            this.props.store.disciplineStore.names.map(discName => ({
                name: discName.name,
                value: project => project.getDiscipline(discName.id),
                children: [{
                        name: 'Budget',
                    value: project => project.getDiscipline(discName.id).budget,
                        format: 'currency',
                    }, {
                        name: 'Variations',
                        value: project => (
                            project.getDiscipline(discName.id).approvedVariations
                                .reduce((acc, variation) => acc += variation.actualCost, 0)
                        ),
                        format: 'currency',
                    }, {
                        name: 'Actuals',
                        value: project => project.getDiscipline(discName.id).actualCost,
                        format: 'currency',
                    }]
                })
            ),
            {
                name: 'Overall',
                children: [
                    {
                        name: 'Budget',
                        value: {
                            columns: {
                                name: ['Budget', 'Variations'],
                            },
                            accessor: values => values.reduce((acc, val) => acc += val[1], 0),
                        },
                        format: 'currency',
                    },
                    {
                        name: 'Actuals',
                        value: {
                            columns: {
                                name: 'Actuals',
                            },
                            accessor: values => values.reduce((acc, val) => acc += val[1], 0),
                        },
                        format: 'currency',
                    },
                    {
                        name: 'VAR',
                        value: {
                            columns: {
                                name: ['Budget', 'Actuals'],
                            },
                            ignore: {
                                name: 'Overall'
                            },
                            accessor: values => values.reduce((acc, val) => {
                                if (val[0] === 'Budget') {
                                    acc += val[1]
                                } else if (val[0] === 'Actuals') {
                                    acc -= val[1]
                                }

                                return acc
                            }, 0)
                        },
                        format: 'currency',
                    }
                ]
            }
        )

        return (
            <MobxTable
                className="table table-bordered table-hover table-striped horizontal-center"
                headCellClassName="vertical-center less-padding"
                bodyCellClassName="vertical-center less-padding"
                columns={columns}
                data={projects}

            />
        )
    }
}

export default FinancialReport
