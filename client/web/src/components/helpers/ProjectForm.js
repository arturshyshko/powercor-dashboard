import React from 'react'

export const FormControl = ({children, ...props}) => (
    <div className="form-group">
        <label className="control-label col-sm-2" htmlFor={props.id}>{props.label}</label>
        <div className="col-sm-10">
            {children}
        </div>
    </div>
)

export const InputText = ({type, id, name, control, value, handleChange, placeholder}) => (
    <input
        type={type || "text"}
        id={id || control}
        name={name || control}
        value={value}
        onChange={handleChange}
        className="form-control"
        placeholder={placeholder}
    />
)

export const InputTextArea = ({id, name, control, value, handleChange, placeholder}) => (
    <textarea
        id={id || control}
        name={name || control}
        value={value}
        onChange={handleChange}
        className="form-control"
        placeholder={placeholder}
    />
)

export const InputSelect = ({id, name, control, value, handleChange, options}) => (
     <select className="form-control"id={id || control } name={name || control} value={value} onChange={handleChange} >
        {
            options.map((option, i) => (
                <option key={i} value={option.id}>{option.name}</option>
            ))
        }
     </select>
)
