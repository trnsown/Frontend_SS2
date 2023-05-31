
import { ShowAlertToast } from "./ToastService";
import { http } from "../helpers/request";

export const Checkout = async (cart) => {
    var user_id = localStorage.getItem("user_id");
    if (user_id === null || user_id === undefined) {
        ShowAlertToast("Please login!")
        return null;
    }
    console.log(cart.cart_id)
    const { data } = await http.post(`/checkout?cart_id=${cart.cart_id}`, {
        cart_id: cart.cart_id,
        address: cart.address,
        phoneNumber: cart.phoneNumber

    });

    return data;
}