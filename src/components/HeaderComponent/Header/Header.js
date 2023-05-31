import HeaderMain from "../HeaderMain/HeaderMain";
import './Header.css'
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import HeaderButton from "../UI/Buttons/HeaderButton";
import PageBrand from "../UI/Logo/Brand";
import Brand from "../UI/Logo/Brand";
import SearchForm from "../../MainComponent/ProductPage/SearchForm/SearchForm";
import { LogOut } from "../../../services/Services";
import { ShowAlertToast } from "../../../services/ToastService";
function Header({ isAuthenticated, setIsAuthenticated, onLogout }) {
    return (
        <header class="section-header">
            <section class="header-main" >
                <div class="container">
                    <div class="row gy-3 align-items-center">

                        <Brand />
                        <div class="order-lg-last col-9 ml-auto ">
                            <div class="float-end">

                                {isAuthenticated ? (

                                    <div class="dropdown">
                                        <button class="dropbtn">
                                            <span>{localStorage.getItem('username')}</span>
                                        </button>
                                        <div class="dropdown-content">
                                            <Link to="/userdata">Edit profile</Link>
                                            <Link to='/userdata/changepassword'>Change Password </Link>
                                            <a className="text-danger" onClick={() => {
                                                LogOut();
                                                setIsAuthenticated(false);
                                                ShowAlertToast("Signed out!")
                                            }}>Log out</a>
                                        </div>
                                    </div>


                                ) : <Link to="/login"> <HeaderButton name="Sign in" logo="fa fa-user"></HeaderButton></Link>}

                            </div>
                            {isAuthenticated ? (<div class="float-end">
                                <Link to='/order_list'> <HeaderButton name="My Order" logo="fa fa-list" /></Link>
                                <Link to='/cart'> <HeaderButton name="My Cart" logo="fa fa-shopping-cart" /></Link>
                            </div>) : (<div></div>)}

                        </div>
                    </div>
                </div>
            </section>
            <Navbar />
        </header>
    );
}
export default Header;