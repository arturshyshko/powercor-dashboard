import React from 'react'
import { fetchProjectsData } from '../services/apiAccess'

export class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        fetchProjectsData((data) => console.log(data))
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}