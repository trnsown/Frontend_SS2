
function LanguageDropdown() {
    return (
        <nav className="dropup">
            <button className="dropdown-toggle btn d-flex align-items-center py-0" type="button" data-bs-toggle="dropdown">
                <img src="assets/images/flag-usa.webp" className="me-2" height="20" />
                <span>English</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">VietNam</a></li>

            </ul>
        </nav>);
}
export default LanguageDropdown