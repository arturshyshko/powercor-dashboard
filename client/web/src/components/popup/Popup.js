import React from 'react'
import Popup from 'reactjs-popup'

import { observable } from 'mobx'

import ProjectEdit from '@components/forms/ProjectEdit'


class ControlledPopup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: this.props.isOpen || false,
        }
    }

    render = () => (
        <Popup open={this.props.isOpen} >
            <div>
                <button onClick={this.props.handleClose}>close</button>
            </div>
        </Popup>
    )
}

export default ControlledPopup


export const controlledPopup = WrappedComponent =>
    class ComponentPopup extends React.Component {
        render() {
            return (
                <Popup open={this.props.isOpen} >
                    <button onClick={this.props.handleClose} style={{float: 'right'}} >Close</button>
                    <WrappedComponent {...this.props} />
                </Popup>
            )
        }
    }


export const ProjectEditPopup = controlledPopup(ProjectEdit)
