import React from 'react';
import NavItem from './NavItem';

function NavMenu() {
    const navItems = [
        { label: 'Products', href: 'products/1/10' },
    ];

    return (
        <div className="collapse navbar-collapse" id="navbar_main">
            <ul className="navbar-nav">
                {navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}
            </ul>
        </div>
    );
}


export default NavMenu;
