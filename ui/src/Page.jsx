import React from 'react';
import { NavLink } from 'react-router-dom';
import Content from './Content.jsx';

const NavBar = () => {
    return (
        <nav>
            <NavLink exact to="/">
                Home
            </NavLink>
            {' | '}
            <NavLink to="/issues">
                Issue List
            </NavLink>
            {' | '}
            <NavLink to="/report">
                Report
            </NavLink>
        </nav>
    )
}

const Page = () => {
    return (
        <div>
            <NavBar />
            <Content />
        </div>
    )
}

export default Page
