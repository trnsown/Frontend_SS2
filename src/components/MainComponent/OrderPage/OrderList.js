import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { GetCartsForUser } from "../../../services/CartServices";

function OrderList() {

    const [carts, setCarts] = useState([]);
    useEffect(() => {
        getCarts();
    }, []);
    async function getCarts() {
        const cartsResponse = await GetCartsForUser();
        // console.log(cartsResponse);
        setCarts(cartsResponse.data);
    }
    function GetIncompleteOrders() {
        if (carts == null || carts == undefined) {
            return [];
        }
        return carts?.filter((cart) => {
            return cart.cart_status == 1;
        }).reverse();
    }
    function GetCompletedOrders() {
        if (carts == null || carts == undefined) {
            return [];
        }
        return carts?.filter((cart) => {
            return cart.cart_status == 2;
        }).reverse();
    }
    return (
        <div>
            <section class="bg-light my-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card border shadow-0 bg-secondary">
                                <h4 class="cart-title mt-3 ml-3 mb-4">
                                    Your Order History
                                </h4>
                                <article class="bg-info bg-gradient filter-group border rounded-6 ml-5 mr-5 mb-5">
                                    <header class="card-header">
                                        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                                            <i class="icon-control fa fa-chevron-down"></i>Incomplete Order: {GetIncompleteOrders()?.length}
                                        </a>
                                    </header>
                                    <div class="collapse hide" id="collapse_aside1">
                                        {GetIncompleteOrders()?.map((cart) => (
                                            <OrderCard key={cart.cart_id}{...cart} />
                                        ))}
                                    </div>
                                </article>
                                <article class="bg-success bg-gradient  filter-group border rounded-6 ml-5 mr-5 mb-5">
                                    <header class="card-header">
                                        <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2">
                                            <i class="icon-control fa fa-chevron-down"></i>Completed Order: {GetCompletedOrders()?.length}
                                        </a>
                                    </header>
                                    <div class="collapse hide" id="collapse_aside2">
                                        {GetCompletedOrders()?.map((cart) => (
                                            <OrderCard key={cart.cart_id}{...cart} />
                                        ))}
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div class="border-top pt-4 mx-4 mb-4">
                        <p>
                            <i class="fas fa-truck text-muted fa-lg"></i> Free Delivery
                            within 1-2 weeks
                        </p>
                        <p class="text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default OrderList;