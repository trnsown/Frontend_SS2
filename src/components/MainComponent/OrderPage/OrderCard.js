import { useEffect, useState } from "react";
import { GetCartLinesByCartID } from "../../../services/CartServices";
import OrderProductSummary from "./OrderProductSummary";

function OrderCard(props) {
    const [ordered_date, setOrderedDate] = useState("");
    const [completed_date, setCompletedDate] = useState("");
    const [cartLines, setCartLines] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        console.log(props)
        var t_order = "";
        if (props.ordered_at !== null) {
            t_order = props.ordered_at.split(/[- T+.:]/);
        }
        var c_order = "";
        if (props.completed_at !== null) {
            c_order = props.completed_at.split(/[- T+.:]/);
        }
        var d_order = new Date(Date.UTC(t_order[0], t_order[1] - 1, t_order[2], t_order[3], t_order[4], t_order[5]));
        var c_order = new Date(Date.UTC(c_order[0], c_order[1] - 1, c_order[2], c_order[3], c_order[4], c_order[5]));
        setOrderedDate(d_order);
        setCompletedDate(c_order)
        GetCartLines();

    }, []);
    async function GetCartLines() {
        var result = await GetCartLinesByCartID(props.cart_id);
        setCartLines(result.data);
        var total = 0;
        for (var i = 0; i < result.data.length; i++) {
            var value = result.data[i].quantity * result.data[i].product.price;
            total += value;
        }
        setTotalPrice(total);
    }
    return (
        <div class="card-body row ml-5 mr-5 mb-3 border rounded-4 bg-light bg-gradient">
            <div >
                <div >
                    <h3>Order id: {props.cart_id}</h3>
                </div>
                <div>
                    <span>Ordered at: {ordered_date.toString()}</span>

                </div>
                <p>Has paid: {props.hasPaid ? ("Yes") : ("No")}</p>
                <p>Address: {props.address}</p>
                <p>Phone number: {props.phoneNumber}</p>
                {props.cart_status === 2 ? (
                    <div>
                        <span >Completed at: {completed_date.toString()}</span>
                    </div>
                ) : (<div></div>)}
                <div class="d-flex">
                    <h5>Total product: {cartLines.length}</h5>
                    <h5 class="ml-auto" >Total price: ${totalPrice}</h5>
                </div>
            </div>
            <article class="filter-group border rounded-6 bg-light bg-gradient ">
                <header class="card-header ">
                    <a href="#" class="title" data-bs-toggle="collapse" data-bs-target={`#collapse-order-card-${props.cart_id}`}>
                        <i class="icon-control fa fa-chevron-down"></i>Order detail
                    </a>
                </header>
                <div class="collapse hide " id={`collapse-order-card-${props.cart_id}`}>
                    {cartLines.map((cartLine) => (
                        <OrderProductSummary
                            key={cartLine.product_id}{...cartLine} />
                    ))}
                </div>
            </article>

        </div>
    )
}
export default OrderCard;