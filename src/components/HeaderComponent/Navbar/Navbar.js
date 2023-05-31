import React from 'react';
import NavMenu from './NavMenu';

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-gray-light navbar-expand-lg">
            <div className="container">
                <button className="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <NavMenu />
            </div>
        </nav>
    );
}

export default Navbar;
