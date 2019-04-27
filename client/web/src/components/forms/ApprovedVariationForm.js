import React, { Fragment } from 'react'
import { observer } from 'mobx-react'

import { InputText, InputTextArea } from '@components/helpers/Form'


@observer
class ApprovedVariationForm extends React.Component {
    render() {
        const { variation, handleInputChange } = this.props

        return (
            <Fragment>
                <div className="form-row">
                    <InputTextArea
                        label="Variation: "
                        control="comment"
                        className="form-control"
                        colWidth="2"
                        value={variation ? variation.comment : ''}
                        handleChange={e => handleInputChange(e, variation.id)}
                    />
                    <InputText
                        label="Actual cost: "
                        control="actualCost"
                        className="form-control"
                        colWidth="2"
                        value={variation ? variation.actualCost : null}
                        handleChange={e => handleInputChange(e, variation.id)}
                    />
                </div>
            </Fragment>
        )
    }
}

export default ApprovedVariationForm
