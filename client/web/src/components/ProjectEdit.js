import React from 'react'
import '../App.css'

export class ProjectEdit extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" placeholder="Enter email"></input>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
