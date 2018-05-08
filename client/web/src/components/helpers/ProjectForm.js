import React from 'react'

export const FormInput = ({children, ...props}) => (
    <div className="form-group">
        <label className="control-label col-sm-2" htmlFor={props.id}>{props.label}</label>
        <div className="col-sm-10">
            {children}
        </div>
    </div>
)

export class InputText extends React.Component {
    render() {
        return (
            <input
                type={this.props.type || "text"}
                id={this.props.id || this.props.control}
                name={this.props.name || this.props.control}
                value={this.props.value}
                onChange={this.props.handleChange}
                className="form-control"
                placeholder={this.props.placeholder}
            />
        )
    }
}

export class InputSelect extends React.Component {
    render() {
        return (
            <select
                className="form-control"
                id={this.props.id || this.props.control }
                name={this.props.name || this.props.control}
                value={this.props.value}
                onChange={this.props.handleChange}
            >
                {this.props.options.map((option, i) => (
                    <option key={i} value={option.id}>{option.name}</option>
                ))}
            </select>
        )
    }
}
