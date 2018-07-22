import React from 'react'

import { FormControl, InputText, InputTextArea, InputSelect } from './helpers/FormElements'

import { camelizeKeys, filterKeys } from '../services/attributesProcessor'


export class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return [

            <div className="form-row">
                <FormControl label="Network number:" id="network" childWidth="3">
                    <InputText
                        placeholder="Enter project network number"
                        control="network"
                        value={this.props.project.network}
                        handleChange={this.props.handleInputChange}
                    />
                </FormControl>
                <FormControl label="Project name:" id="name" childWidth="3">
                    <InputText
                        placeholder="Enter project name"
                        control="name"
                        value={this.props.project.name}
                        handleChange={this.props.handleInputChange}
                    />
                </FormControl>
                <FormControl label="Design manager:" id="manager" childWidth="3">
                    <InputSelect
                        control="manager"
                        value={this.props.project.manager}
                        options={this.props.managers}
                        handleChange={this.props.handleInputChange}
                    />
                </FormControl>
            </div>,

            <div className="form-row">
                <FormControl label="Client:" id="client" childWidth="4">
                    <InputSelect
                        control="client"
                        value={this.props.project.client}
                        options={this.props.clients}
                        handleChange={this.props.handleInputChange}
                    />
                </FormControl>
                <FormControl label="Business importance:" id="importance" childWidth="4">
                    <InputSelect
                        control="businessImportance"
                        value={this.props.project.importance}
                        options={this.props.importances}
                        handleChange={this.props.handleInputChange}
                    />
                </FormControl>
            </div>,

            <div className="form-row">
                <FormControl label="Comments:" id="comment" childWidth="4">
                    <InputTextArea
                        placeholder="Enter your comments"
                        control="comment"
                        value={this.props.project.comment}
                        handleChange={this.props.handleInputChange}
                    />
                </FormControl>
            </div>
        ]
    }
}
