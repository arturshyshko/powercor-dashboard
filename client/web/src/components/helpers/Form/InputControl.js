import React from 'react'

export const withLabel = (WrappedComponent) =>
    class WithLabel extends React.Component {
        render() {
            const { id, label, colWidth, ...props } = this.props
            return (
                <div className={`form-group col-md${colWidth ? '-' + colWidth : ''}`} >
                    <label htmlFor={id}>{label}</label>
                    <WrappedComponent id={id} {...props} />
                </div>
            )
        }
    }

export const controlledInput = (WrappedComponent) =>
    class ControlledInput extends React.Component {
        render() {
            const {className, control, id=control, name=control, value, handleChange, placeholder, ...props} = this.props
            return (
                <WrappedComponent
                    className={className}
                    id={id}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...props}
                />
            )
        }
    }
