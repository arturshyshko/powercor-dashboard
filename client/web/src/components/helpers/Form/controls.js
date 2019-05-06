import React from 'react'
import { withLabel, controlledInput } from './InputControl'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'


const Text = (props) => (
    <input type="text" {...props} />
)

const TextArea = (props) => (
    <textarea cols="30" rows="5" {...props} />
)

const Select = ({options=[], ...props}) => (
    <select {...props} >
        {props.value === null && <option disabled selected value style={{display: 'none'}}>-------</option>}
        {options.map((option, i) => (
            <option key={`select-${i}`} value={option.id} >{option.display}</option>
        ))}
    </select>
)

class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange(date) {
        const { onChange, name } = this.props
        // We can't pass simply date because our handle functions work with JS event object with at least following
        let e = {
            target: { name: name, value: date }
        }
        return onChange(e)
    }

    render() {
        const {value, handleChange, onChange, ...props} = this.props

        return (
            <DatePicker
                selected={value}
                onChange={this.handleDateChange}
                {...props}
            />
        )
    }
}

export const InputText = withLabel(controlledInput(Text))
export const InputTextArea = withLabel(controlledInput(TextArea))
export const InputSelect = withLabel(controlledInput(Select))
export const InputCalendar = withLabel(controlledInput(Calendar))
