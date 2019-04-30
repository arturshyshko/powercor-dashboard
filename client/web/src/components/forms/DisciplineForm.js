import React, { Fragment } from 'react'
import { observer } from 'mobx-react'

import { InputText, InputSelect, InputCalendar } from '@components/helpers/Form'
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
                        className="form-control"
                        value={discipline.name}
                        options={disciplineNames}
                        handleChange={(e) => handleInputChange(e, discipline.id)}
                    />
                    <InputSelect
                        label="Stage: "
                        control="stage"
                        className="form-control"
                        value={discipline.stage}
                        options={stages}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputCalendar
                        label="Due Date: "
                        control="dueDate"
                        className="form-control"
                        value={discipline.dueDate}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputSelect
                        label="Resources: "
                        control="resources"
                        className="form-control"
                        value={discipline.resources}
                        options={resources}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputSelect
                        label="Status: "
                        control="status"
                        className="form-control"
                        value={discipline.status}
                        options={statuses}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputText
                        label="Budget: "
                        control="budget"
                        className="form-control"
                        value={discipline.budget}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                    <InputText
                        label="Actual Cost: "
                        control="actualCost"
                        className="form-control"
                        value={discipline.actualCost}
                        handleChange={e => handleInputChange(e, discipline.id)}
                    />
                </div>
                {discipline.approvedVariations.map((variation, i) => (
                    <ApprovedVariationForm
                        key={`variation-form-${i}`}
                        variation={variation}
                        handleInputChange={handleVariationChange}
                    />
                ))}
            </Fragment>
        )
    }
}

export default DisciplineForm;
