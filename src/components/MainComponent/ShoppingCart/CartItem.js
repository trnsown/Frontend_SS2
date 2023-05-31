import React from "react";
import { useEffect, useState } from "react";
import useStore from "../../../context/cartStore";
import { GetProductByID } from "../../../services/Services";
import { ModifyProductOfCart } from "../../../services/CartServices";
import { NavLink } from "react-router-dom";
function CartItem(props) {
    const [selectedQuantity, setSelectedQuantity] = useState(props.quantity);
    const [totalPrice, setTotalPrice] = useState((selectedQuantity * Number(props.price)).toFixed(2));
    const [product, setProduct] = useState({});
    // const type = props.type.join(", ");
    function handleQuantityChange(event) {
        const quantity = event.target.value;
        // updateQuantity(props.id, quantity);
        setSelectedQuantity(quantity);
        modifyProductQuantity(quantity);
    }
    // const updateQuantity = useStore(state => state.setItemQuantity);
    useEffect(() => {
        const pricePerItem = Number(props.product.price);
        const totalPrice = (selectedQuantity * pricePerItem).toFixed(2);
        setTotalPrice(totalPrice);
        // props.onPriceChange(props.id, Number(totalPrice));

    }, [selectedQuantity]);
    useEffect(() => {
        setProduct(props.product);
        setSelectedQuantity(props.quantity);
    }, []);
    async function modifyProductQuantity(quantity) {
        await ModifyProductOfCart(props.product_id, quantity);
        props.onUpdateCart();
    }
    async function handleRemoveItem() {
        await ModifyProductOfCart(props.product_id, 0);
        props.onUpdateCart();
    };
    return (
        <div class="row gy-3 mb-4">
            <div class="col-lg-5">
                <div class="me-lg-5">
                    <div class="d-flex">
                        <img
                            src={product.img1}
                            class="border rounded me-3"
                            style={{ width: `96px`, height: `96px` }}
                        />
                        <div class="">
                            <NavLink to={`/product/${product.id}`}>
                                <a class="nav-link" >{product.name}</a>
                            </NavLink>

                            <p class="text-muted">{product.short_description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap"
            >
                <div class="">
                    <input type="number" style={{ width: `100px` }} class="form-control me-4" value={selectedQuantity} onChange={handleQuantityChange}>
                    </input>
                </div>
                <div class="">
                    <text class="h6">${totalPrice}</text> <br />
                    <small class="text-muted text-nowrap">
                        {product.price} / per item
                    </small>
                </div>
            </div>
            <div
                class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2"
            >
                <div class="float-md-end">
                    <a
                        href="#!"
                        class="btn btn-light border px-2 icon-hover-primary"
                    ><i class="fas fa-heart fa-lg px-1 text-secondary"></i
                    ></a>


                    <button class="btn btn-light border text-danger icon-hover-danger" onClick={handleRemoveItem}>Remove</button>
                </div>
            </div>
        </div>
    );

}
export default CartItem;