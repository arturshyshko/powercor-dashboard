import React from 'react'
import { withLabel, controlledInput } from './InputControl'


const Text = (props) => (
    <input type="text" {...props} />
)

const TextArea = (props) => (
    <textarea cols="30" rows="10" {...props} />
)

const Select = ({options=[], ...props}) => (
    <select {...props} >
        {options.map((option, i) => (
            <option key={`select-${i}`} value={option.id} >{option.display}</option>
        ))}
    </select>
)

export const InputText = withLabel(controlledInput(Text))
export const InputTextArea = withLabel(controlledInput(TextArea))
export const InputSelect = withLabel(controlledInput(Select))
