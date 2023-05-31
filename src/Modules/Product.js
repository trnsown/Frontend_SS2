import { Link } from "react-router-dom";
import useStore from "../context/cartStore";
import { memo } from "react";
import { ShowSuccessToast } from "../services/ToastService";
import { AddProductToCart } from "../services/CartServices";

function Product(props) {
    const addToCart = useStore((state) => state.addToCart)

    const handleAddToCart = () => {
        // const product = {
        //     id: props.id,
        //     name: props.name,
        //     price: props.price,
        //     imgSrc: props.img1,
        //     quantity: 1,
        //     type: ["yellow", "XL"],
        // }
        // addToCart(product)
        var cart_line = AddProductToCart(props.id,1);
        console.log(cart_line);
        if (cart_line.data !== undefined||cart_line.data!==null) {
            ShowSuccessToast(`Add ${props.name} to cart!`)
        }
    }

    return (
        <div class="col-lg-4 col-md-6 col-sm-6" key={props.id}>
            <figure class="card card-product-grid">
                <div class="img-wrap">
                    <img style={{ width: `100%` }} src={props.img1} />
                </div>
                <figcaption class="info-wrap border-top">
                    <div class="price-wrap">
                        <strong class="price">${props.price}</strong>
                    </div>
                    <Link to={`/product/${props.id}`} class="title mb-2">
                        {props.name}
                    </Link>
                    <p>
                        Category: {props.category.name}
                    </p>
                    <p>
                        Brand: {props.brand.name}
                    </p>

                    <button onClick={handleAddToCart} class="btn btn-primary">
                        Add to cart
                    </button>
                    <a href="#" class="btn btn-light btn-icon">
                        {' '}
                        <i class="fa fa-heart"></i>{' '}
                    </a>
                </figcaption>
            </figure>
        </div>
    )
}

export default memo(Product)