import React, { Fragment } from 'react'

import { InputText, InputTextArea, InputSelect } from '@components/helpers/Form'

import { camelizeKeys, filterKeys } from '@services/attributesProcessors'


class ProjectForm extends React.Component {
  render() {
    const { project, handleInputChange } = this.props
    return (
      <Fragment>
        <div className="form-row">
          <InputText
            label="Network number:"
            control="network"
            className="form-control"
            colWidth="3"
            value={project.network}
            handleChange={handleInputChange}
            placeholder="Enter project network number"
          />
          <InputText
            label="Project name:"
            control="name"
            colWidth="3"
            className="form-control"
            value={project.name}
            handleChange={handleInputChange}
            placeholder="Enter project name"
          />
        </div>
        <div className="form-row">
          <InputSelect
            label="Design manager:"
            control="manager"
            colWidth="2"
            className="form-control"
            value={project.manager}
            options={this.props.managers}
            handleChange={handleInputChange}
          />
          <InputSelect
            label="Client:"
            control="client"
            colWidth="2"
            className="form-control"
            value={project.client}
            options={this.props.clients}
            handleChange={handleInputChange}
          />
          <InputSelect
            label="Business importance:"
            control="businessImportance"
            colWidth="2"
            className="form-control"
            value={project.importance}
            options={this.props.importances}
            handleChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <InputText
            label="Project Status:"
            control="status"
            colWidth="3"
            className="form-control"
            value={project.status}
            handleChange={handleInputChange}
            placeholder="Enter project status"
          />
          <InputText
            label="Project Priority:"
            control="priority"
            colWidth="3"
            className="form-control"
            value={project.priority}
            handleChange={handleInputChange}
            placeholder="This field cannot be edited."
          />
        </div>
        <div className="form-row">
          <InputTextArea
            label="Comments:"
            control="comment"
            colWidth="3"
            className="form-control"
            value={project.comment}
            handleChange={handleInputChange}
            placeholder="Enter your comments"
          />
        </div>
      </Fragment>
    )
  }
}

export default ProjectForm
