import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";


function OrderProductSummary(props) {


    return (
        <div class="ml-4 mr-4 border-top d-flex justify-content-between">

            <Link class="col-lg-4" to={`/product/${props.product.id}`}>
                <a class="nav-link" >{props.product.name}</a>
            </Link>

            <span class="col-lg-3 text-center mr-auto">Quantity: {props.quantity}</span>
            <span class="col-lg-3 text-center ml-auto">Price: {props.product.price}</span>
            <span class="col-lg-3 text-left">Total price: {props.product.price * props.quantity}</span>
        </div>
    )
}
export default OrderProductSummary;