import { useEffect, useState } from "react";
import ProductList from "../ProductPage/ProductList/ProductList";
import Slider from '../Slider/Slider'
import { useParams } from "react-router";
import { GetProductByID } from "../../../services/Services";
import { AddProductToCart } from "../../../services/CartServices";
import { ShowSuccessToast } from "../../../services/ToastService";

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        getProduct(id);
    }, []);
    async function getProduct(id) {
        try {
            var result = await GetProductByID(id);
            setProduct(result.response.data);
            console.log("rerun")
        } catch (error) {
            console.log(error);
        }
    }
    function onQuantityChange(event) {
        const quantity = event.target.value;
        // updateQuantity(props.id, quantity);
        if (quantity < 0) {
            setQuantity(0);
        } else {
            setQuantity(quantity);
        }
    }
    async function addToCart() {
        if (quantity > 0) {
            var result = await AddProductToCart(id, quantity);
            if (result.status_code === 200) {
                ShowSuccessToast(`Product ${product.name} added to cart`);
            }
        }
    }
    if (!product) {
        return <div>Loading...</div>;
    }
    return (
        <div className="home-section">
            <div class="container-mid">
            </div>
            <section class="padding-y">
                <div class="container">

                    <div class="row">
                        <aside class="col-lg-6">
                            <article class="gallery-wrap">
                                <div class="img-big-wrap img-thumbnail">
                                    <Slider key={product.id}
                                        {...product} />
                                </div>
                            </article>
                        </aside>
                        <main class="col-lg-6">
                            <article class="ps-lg-3">
                                <h4 class="title text-dark">{product.name}</h4>

                                <div class="mb-3">
                                    <var class="price h5">${product.price}</var>
                                    <span class="text-muted">/per</span>
                                </div>

                                <p>{product.long_description}</p>

                                <dl class="row">
                                    <dt class="col-3">Category</dt>
                                    <dd class="col-9">{product.category?.name}</dd>

                                    <dt class="col-3">Brand</dt>
                                    <dd class="col-9">{product.brand?.name}</dd>
                                </dl>

                                <hr />

                                <div class="row mb-4">
                                    <div class="col-md-4 col-6 mb-3">
                                        <label class="form-label d-block ">Quantity</label>
                                        <div class="input-group input-spinner">
                                            <button onClick={() => {
                                                if (quantity > 0) {
                                                    setQuantity(quantity - 1)
                                                }
                                            }} class="btn btn-icon btn-warning" type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                                    <path d="M19 13H5v-2h14v2z"></path>
                                                </svg>
                                            </button>
                                            <input type="number" class="form-control text-center" placeholder="" value={quantity} onChange={onQuantityChange} />
                                            <button onClick={() => {
                                                setQuantity(quantity + 1)
                                            }} class="btn btn-icon btn-success" type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <a onClick={addToCart} class="btn  btn-primary"> <i class="me-1 fa fa-shopping-basket"></i> Add to cart </a>
                            </article>
                        </main>
                    </div>
                    <span>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</span>
                </div>

            </section>

        </div>
    );
}

export default ProductDetailPage;