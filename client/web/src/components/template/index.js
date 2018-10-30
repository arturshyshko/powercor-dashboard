import React, { Fragment } from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'


const siteTemplate = (WrappedComponent) =>
    class SiteTemplate extends React.Component {
        render() {
            return (
                <Fragment>
                    <Navbar history={this.props.history} />
                    <Dashboard>
                        <WrappedComponent {...this.props} />
                    </Dashboard>
                </Fragment>
            )
        }
    }

export default siteTemplate
