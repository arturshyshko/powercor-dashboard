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
                lol
                <button onClick={this.props.handleClose}>close</button>
            </div>
        </Popup>
    )
}

export default ControlledPopup


// class ProjectEditPopup extends React.Component {
//     render() {
//         return (
//             <Popup

//             >

//             </Popup>
//         )
//     }
// }

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


// class ControlledPopup extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { open: false }
//     this.openModal = this.openModal.bind(this)
//     this.closeModal = this.closeModal.bind(this)

//   }
//   openModal (){
//     this.setState({ open: true })
//   }
//   closeModal () {
//     this.setState({ open: false })
//   }

//   render() {
//     return (
//       <div>
//         <button className="button" onClick={this.openModal}>
//           Controlled Popup
//         </button>
//         <Popup
//           open={this.state.open}
//           closeOnDocumentClick
//           onClose={this.closeModal}
//         >
//           <div className="modal">
//             <a className="close" onClick={this.closeModal}>
//               &times;
//             </a>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
//             omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
//             ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
//             doloribus. Odit, aut.
//           </div>
//         </Popup>
//       </div>
//     )
//   }
// }