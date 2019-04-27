import React, { Fragment } from 'react'
import { observer } from 'mobx-react'

import { InputText, InputTextArea, InputSelect } from '@components/helpers/Form'
import ApprovedVariationForm from './ApprovedVariationForm'


@observer
class DisciplineForm extends React.Component {
    render() {
        const { discipline, handleInputChange, handleVariationChange,
            disciplineNames, stages, resources, statuses} = this.props

        return (
            <Fragment>
                <div className="form-row">
                    <InputSelect
                        label="Name: "
                        control="name"
                        colWidth="2"
                        className="form-control"
                        value={discipline.name}
                        options={disciplineNames}
                        handleChange={(e) => handleInputChange(e, discipline.id)}
                    />
                    <InputSelect
                        label="Stage: "
                        control="stage"
                        colWidth="2"
                        className="form-control"
                        value={discipline.stage}
                        options={stages}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputSelect
                        label="Resources: "
                        control="resources"
                        colWidth="2"
                        className="form-control"
                        value={discipline.resources}
                        options={resources}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputSelect
                        label="Status: "
                        control="status"
                        colWidth="2"
                        className="form-control"
                        value={discipline.status}
                        options={statuses}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputText
                        label="Budget: "
                        control="budget"
                        colWidth="2"
                        className="form-control"
                        value={discipline.budget}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputText
                        label="Actual Cost: "
                        control="actualCost"
                        colWidth="2"
                        className="form-control"
                        value={discipline.actualCost}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                </div>
                {discipline.approvedVariations.map(variation => (
                    <ApprovedVariationForm
                        variation={variation}
                        handleInputChange={handleVariationChange}
                    />
                ))}
            </Fragment>
        )
    }
}

export default DisciplineForm;
