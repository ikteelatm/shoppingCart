import React, {Component } from 'react';
import logo from '../../../public/logo.png';
import './Navbar.css';

class Navbar extends Component {
    render () {
        return (
            <nav className="navbar navbar-light">
                <a className="navbar-brand">
                    <img src={logo} width="30" height="30"
                         className="d-inline-block align-top" alt="logo"/>
                        Buy Courses
                </a>
                <span> {this.props.cartSize} </span>
            </nav>
        );
    }
}

export default Navbar;