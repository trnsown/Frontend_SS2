import ProductList from "./ProductList/ProductList";

// import 'rc-slider/assets/index.css';
import React, { memo, useContext, useEffect, useState } from "react";
import PriceRange from "../Slider/PriceRange/PriceRange";
import { useParams } from "react-router-dom";
import { GetAllBrands, GetAllCategories } from "../../../services/Services";
import CategoryListSideBar from "../../../Modules/CategoryListSideBar";
import { SearchFilter } from "../../../models/SearchFilter";
import { globalSearchFilter } from "../../../GlobalVariables";
import BrandListSideBar from "../../../Modules/BrandListSideBar";
import { Margin, Padding } from "@mui/icons-material";
import SearchForm from "./SearchForm/SearchForm";

function ProductPage() {
    const { page, perPage, keyword } = useParams();
    const [sortOption, setSortOption] = useState('default');
    const [sortFieldOption, setSortFieldOption] = useState('name');
    let sortedProducts = [];
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [filterApplied, setFilterApplied] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const searchFilter = useContext(globalSearchFilter);
    const [update, setUpdate] = useState(1);
    var pageVar = 1;
    var perPageVar = 10;
    // if(page!==1){
    //     pageVar=page;
    // }
    useEffect(() => {
        pageVar = page;
        perPageVar = perPage;
        searchFilter.pageNum = page;
        searchFilter.perPage = perPage;

        searchFilter.keyword = keyword;
        if (keyword == undefined || keyword == null) {
            // keyword = "";
            searchFilter.keyword = "";
        }
        loadCategoriesAndBrands();

    }, []);
    function forceUpdate() {
        searchFilter.pageNum = 0;
        console.log(searchFilter);
        setUpdate(update + 1);

    }
    async function loadCategoriesAndBrands() {
        try {
            const result = await GetAllCategories();
            const resultBrands = await GetAllBrands();
            // categoriesDisplayList = result.response.data;
            setCategories(result.response.data);
            setBrands(resultBrands.response.data);

        } catch (error) {
            console.error(error);
        }
    }

    const handleFilterClick = () => {
        setFilterApplied(true);

    };
    const handlePriceRangeChange = (minPrice, maxPrice) => {
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };
    const resetFilter = () => {
        setMinPrice(0);
        setMaxPrice(100);
        setFilterApplied(false);
    };
    const handleSortChange = (event) => {
        window.history.replaceState(null, "Products", `/products/1/${searchFilter.perPage}/${searchFilter.keyword}`)
        setSortOption(event.target.value);
        sortProducts(event.target.value);
        forceUpdate();
    };
    const handleSortTypeChange = (event) => {
        window.history.replaceState(null, "Products", `/products/1/${searchFilter.perPage}/${searchFilter.keyword}`)
        setSortFieldOption(event.target.value);
        sortProductByField(event.target.value);
        forceUpdate();
    };
    function sortProductByField(value) {
        switch (value) {
            case 'name':
                searchFilter.sortField = 'name';
                break;
            case 'price':
                searchFilter.sortField = 'price';
                break;
        }

    }
    function sortProducts(value) {
        switch (value) {
            case 'low-to-high':
                searchFilter.sortType = "asc";
                break;
            case 'high-to-low':
                searchFilter.sortType = "des";
                break;
            default:
                searchFilter.sortType = "";
                break;
        }
    };
    return (
        <div className="home-section">


            <section class="bg-primary py-5">
                <div class="container" style={{ textAlign: 'center' }}>
                    <h2 class="text-white" >Products</h2>
                </div>
            </section>
            <section class="padding-y">
                <div class="container">
                    <div class="row">
                        <aside class="col-lg-3">
                            <button class="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-bs-toggle="collapse" data-bs-target="#aside_filter">Show filter</button>

                            <div id="aside_filter" class="collapse card d-lg-block mb-5">
                                <article class="filter-group">
                                    <header class="card-header">
                                        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                                            <i class="icon-control fa fa-chevron-down"></i>Brands
                                        </a>
                                    </header>
                                    <div class="collapse show" id="collapse_aside1">
                                        <div class="card-body">
                                            <div class="row">
                                                <BrandListSideBar setProductPageUpdate={forceUpdate} brands={brands} searchFilter={searchFilter} />
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                <article class="filter-group">
                                    <header class="card-header">
                                        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside_brands">
                                            <i class="icon-control fa fa-chevron-down"></i>  Categories
                                        </a>
                                    </header>
                                    <div class="collapse show" id="collapse_aside_brands">
                                        <div class="card-body">
                                            <div class="row">
                                                <CategoryListSideBar setProductPageUpdate={forceUpdate} categories={categories} searchFilter={searchFilter} />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>


                        </aside>
                        <main class="col-lg-9">

                            <header class="border-bottom row" style={{ marginBottom: '10px', paddingBottom: '10px' }}>
                                <span class="col-lg-7 align-self-end" style={{ marginBottom: '2px' }} >
                                    <SearchForm  forceUpdate={forceUpdate} searchFilter={searchFilter} /></span>
                                <span class="col-lg-2" style={{ textAlign: 'center' }}>
                                    <span style={{ marginRight: '10px', textAlign: 'center' }}>Sort by:</span>
                                    <select class="form-select d-inline-block w-auto me-1" value={sortFieldOption} onChange={handleSortTypeChange} >
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                    </select>
                                </span>
                                <span class="col-lg-3" style={{ textAlign: 'center' }}>
                                    <span style={{ marginRight: '10px' }}>Sort type:</span>
                                    <select class="form-select d-inline-block w-auto me-1" value={sortOption} onChange={handleSortChange} >
                                        <option value="default">Default</option>
                                        <option value="low-to-high">Ascending</option>
                                        <option value="high-to-low">Descending</option>
                                    </select>
                                </span>

                            </header>


                            <div class="row">
                                <ProductList
                                    keyword={keyword}
                                    minPrice={minPrice}
                                    perPage={perPageVar}
                                    pageNum={pageVar}
                                    maxPrice={maxPrice}
                                    searchFilter={searchFilter}
                                    update={update}
                                />
                            </div>

                            <hr />
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default ProductPage;