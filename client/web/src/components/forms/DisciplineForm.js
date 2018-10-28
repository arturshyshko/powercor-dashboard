import React from 'react'

import { FormControl, InputText, InputTextArea, InputSelect } from '@components/helpers/FormElements'


export class DisciplineForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            'name': '',
            'stage': '',
            'budget': '',
            'due_date': '',
            'resources': '',
            'status': ''
        }

        this.parseDisciplineToOption = this.parseDisciplineToOption.bind(this)

    }

    parseDisciplineToOption(discipline) {
        return {
            'id': discipline[0],
            'name': discipline[1]
        }
    }

    render() {
        return (
            <div>
                <div className="form-row">
                    <FormControl label="Discipline name:" id="discipline_name" colWidth="3">
                        <InputSelect
                            control="name"
                            value={this.props.disciplineNames[0]}
                            options={this.props.disciplineNames.map(this.parseDisciplineToOption)}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Discipline name:" id="discipline_name" colWidth="3">
                        <InputSelect
                            control="name"
                            value={this.props.disciplineNames[0]}
                            options={this.props.disciplineNames.map(this.parseDisciplineToOption)}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Discipline name:" id="discipline_name" colWidth="3">
                        <InputSelect
                            control="name"
                            value={this.props.disciplineNames[0]}
                            options={this.props.disciplineNames.map(this.parseDisciplineToOption)}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Discipline name:" id="discipline_name" colWidth="3">
                        <InputSelect
                            control="name"
                            value={this.props.disciplineNames[0]}
                            options={this.props.disciplineNames.map(this.parseDisciplineToOption)}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Discipline name:" id="discipline_name" colWidth="3">
                        <InputSelect
                            control="name"
                            value={this.props.disciplineNames[0]}
                            options={this.props.disciplineNames.map(this.parseDisciplineToOption)}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Discipline name:" id="discipline_name" colWidth="3">
                        <InputSelect
                            control="name"
                            value={this.props.disciplineNames[0]}
                            options={this.props.disciplineNames.map(this.parseDisciplineToOption)}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
            </div>
        )
    }
}
