import { Link } from "react-router-dom";
import HeaderButton from "../UI/Buttons/HeaderButton";
import PageBrand from "../UI/Logo/Brand";
import SearchForm from "../../MainComponent/ProductPage/SearchForm/SearchForm";
function HeaderMain() {
    return (
        <section class="header-main">
            <div class="container">
                <div class="row gy-3 align-items-center">
                    <PageBrand />
                    <div class="order-lg-last col-lg-5 col-sm-8 col-8">
                        <div class="float-end">
                            <Link to='/login'><HeaderButton name="Sign in" logo="fa fa-user" /></Link>
                            <HeaderButton name="Favorites" logo="fa fa-heart" />
                            <Link to='/cart'> <HeaderButton name="My Cart" logo="fa fa-shopping-cart" /></Link>
                        </div>
                    </div>
                    <SearchForm />
                </div>
            </div>
        </section>
    );
}
export default HeaderMain;