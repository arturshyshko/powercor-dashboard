import React from 'react'
import { NavLink } from 'react-router-dom'

import { PROJECTS_LIST, FINANCIAL_REPORT, RESOURCE_ALLOCATION } from '@constants/clientUrls'


const tabs = [
    {
        name: 'Projects List',
        path: PROJECTS_LIST,
    },
    {
        name: 'Financial Report',
        path: FINANCIAL_REPORT,
    },
    {
        name: 'Resource Allocation',
        path: RESOURCE_ALLOCATION,
    },
]


const Navbar = (props) => (
    <ul className="nav nav-tabs">
        {tabs.map((tab, index) => <NavbarLink key={'navbar' + index} tab={tab} /> )}
    </ul>
)

export default Navbar

export const NavbarLink = ({tab, ...props}) => (
    <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" exact to={tab.path} >
            {tab.name}
        </NavLink>
    </li>
)
