import React from 'react'

import { FormControl, InputText, InputTextArea, InputSelect } from '@components/helpers/FormElements'

import { camelizeKeys, filterKeys } from '@services/attributesProcessors'


export class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="form-row">
                    <FormControl label="Network number:" id="network" colWidth="3">
                        <InputText
                            placeholder="Enter project network number"
                            control="network"
                            value={this.props.project.network}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Project name:" id="name" colWidth="3">
                        <InputText
                            placeholder="Enter project name"
                            control="name"
                            value={this.props.project.name}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Design manager:" id="manager" colWidth="3">
                        <InputSelect
                            control="manager"
                            value={this.props.project.manager}
                            options={this.props.managers}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Client:" id="client" colWidth="4">
                        <InputSelect
                            control="client"
                            value={this.props.project.client}
                            options={this.props.clients}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Business importance:" id="importance" colWidth="4">
                        <InputSelect
                            control="businessImportance"
                            value={this.props.project.importance}
                            options={this.props.importances}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
                <div className="form-row">
                    <FormControl label="Comments:" id="comment" colWidth="4">
                        <InputTextArea
                            placeholder="Enter your comments"
                            control="comment"
                            value={this.props.project.comment}
                            handleChange={this.props.handleInputChange}
                        />
                    </FormControl>
                </div>
            </div>
        )
    }
}
