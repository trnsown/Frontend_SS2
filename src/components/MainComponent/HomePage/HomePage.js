import { useContext, useEffect, useState } from "react";
import ProductList from "../ProductPage/ProductList/ProductList";
import Carousel from "./Carousel/Carousel";
import { GetAllBrands, GetAllCategories } from "../../../services/Services";
import { globalSearchFilter } from "../../../GlobalVariables";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([]);
    var searchFilter = useContext(globalSearchFilter);
    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        var categoriesResponse = await GetAllCategories();
        var brandsResponse = await GetAllBrands();
        setCategories(categoriesResponse.response.data);
        setBrands(brandsResponse.response.data);
    }
    function toCategory(id) {
        searchFilter.category_ids = [];
        searchFilter.brand_ids = []
        searchFilter.category_ids.push(id);
        navigate(`/products/1/10`);
    }
    function toBrand(id) {
        searchFilter.category_ids = [];
        searchFilter.brand_ids = [];
        searchFilter.brand_ids.push(id);
        navigate(`/products/1/10`);
    }
    return (
        <div>
            <Carousel></Carousel>
            <section>
                <div class="container pt-5">
                    <nav class="row gy-4">
                        <div class="col-lg-12  ">
                            <div class="d-flex justify-content-center border-bottom">
                                <h4>Categories</h4>
                            </div>

                            <div class="row justify-content-center mt-3 container-fluid">
                                {categories.map((category) => (
                                    <div class="col-2 mb-3">
                                        <a href="#"
                                            class="text-center d-flex flex-column justify-content-center" >
                                            <button
                                                type="button"
                                                class="btn btn-outline-secondary mx-auto my-auto"
                                                data-mdb-ripple-color="dark"
                                                onClick={() => {
                                                    toCategory(category.id)
                                                }}
                                            >
                                                <div >
                                                    <img style={{ width: "50px", height: "50px" }}
                                                        src={category.icon}
                                                        class="img-responsive object-fit-contain border rounded"></img>
                                                </div>

                                            </button>
                                            <div class="text-dark">{category.name}</div>
                                        </a>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div class="col-lg-12  ">
                            <div class="d-flex justify-content-center border-bottom">
                                <h4>Brands</h4>
                            </div>

                            <div class="row justify-content-center mt-3 container-fluid">
                                {brands.map((brand) => (
                                    <div class="col-2 mb-3">
                                        <a href="#"
                                            class="text-center d-flex flex-column justify-content-center" >
                                            <button
                                                type="button"
                                                class="btn btn-outline-secondary mx-auto my-auto"
                                                data-mdb-ripple-color="dark"
                                                onClick={() => {
                                                    toBrand(brand.id)
                                                }}
                                            >
                                                <div >
                                                    <img style={{ width: "50px", height: "50px" }}
                                                        src={brand.icon}
                                                        class="img-responsive object-fit-contain border rounded"></img>
                                                </div>

                                            </button>
                                            <div class="text-dark">{brand.name}</div>
                                        </a>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </nav>
                </div>
            </section>
        </div>
    )



}
export default HomePage;