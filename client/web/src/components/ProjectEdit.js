import React from 'react'
import '../App.css'

import { FormControl, InputText, InputTextArea, InputSelect } from './helpers/FormElements'
import { camelizeKeys, filterKeys } from '../services/attributesProcessor'

export class ProjectEdit extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            network: '',
            name: '',
            manager: '',
            client: '',
            comment: '',
            businessImportance: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentWillMount() {
        // if project passed - replace empty state with values from it
        if (this.props.project) {
            // Camelize all project attributes
            let project = camelizeKeys(this.props.project)
            // Leave only values present in state
            this.setState({...filterKeys(project, Object.keys(this.state))})
        }
    }

    handleInputChange(e) {
        const value = e.target.value
        const name = e.target.name || e.target.control

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <form className="form-horizontal">
                    <FormControl label="Network number:" id="network">
                        <InputText
                            placeholder="Enter project network number"
                            control="network"
                            value={this.state.network}
                            handleChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Project name:" id="name">
                        <InputText
                            placeholder="Enter project name"
                            control="name"
                            value={this.state.name}
                            handleChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Client:" id="client">
                        <InputSelect
                            control="client"
                            value={this.state.client}
                            options={this.props.clients}
                            handleChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Design manager:" id="manager">
                        <InputSelect
                            control="manager"
                            value={this.state.manager}
                            options={this.props.managers}
                            handleChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Comments:" id="comment">
                        <InputTextArea
                            placeholder="Enter your comments"
                            control="comment"
                            value={this.state.comment}
                            handleChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl label="Business importance:" id="importance">
                        <InputSelect
                            control="importance"
                            value={this.state.importance}
                            options={this.props.importances}
                            handleChange={this.handleInputChange}
                        />
                    </FormControl>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Create</button>
                      </div>
                    </div>
                </form>
            </div>
        )
    }
}
