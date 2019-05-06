import React from 'react'
import Popup from 'reactjs-popup'
import './popup.css'

import ProjectEdit from '@components/forms/ProjectEdit'


export const controlledPopup = WrappedComponent =>
    class ComponentPopup extends React.Component {
        render() {
            return (
                <Popup open={this.props.isOpen} onClose={this.props.handleClose} className="controlled-popup container-fluid">
                    {/* <button className="close" onClick={this.props.handleClose} >&times;</button> */}
                    <WrappedComponent {...this.props} />
                </Popup>
            )
        }
    }


export const ProjectEditPopup = controlledPopup(ProjectEdit)
