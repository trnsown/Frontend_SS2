import { Link } from "react-router-dom";

function NavItem({ label, href, dropdown = false, dropdownItems = [] }) {
    const link = href;
    if (dropdown) {
        return (
            <li className="nav-item dropdown">
                <Link className="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">
                    {label}
                </Link>
                <ul className="dropdown-menu">
                    {dropdownItems.map((item, index) => (
                        <li key={index}>
                            <Link className="dropdown-item" to="/">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        );
    } else {
        return (
            <li className="nav-item">
                <Link className="nav-link" to={link}>
                    {label}
                </Link>
            </li>
        );
    }
}
export default NavItem;